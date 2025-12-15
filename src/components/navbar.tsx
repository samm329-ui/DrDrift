
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig, siteProducts } from '@/lib/config';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronDown } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, setIsCartOpen, isCartAnimating, setSearchQuery } = useApp();
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const sectionIds = siteConfig.navLinks.map((link) => link.href.substring(1));
  const activeSection = useScrollSpy(sectionIds.map((id) => `#${id}`), {
    rootMargin: '-20% 0px -80% 0px',
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href === '#our-products') {
      setSearchQuery('');
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
    setIsProductDropdownOpen(false);
  };
  
  const handleProductItemClick = (slug: string) => {
    const element = document.getElementById(`product-card-${slug}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setIsProductDropdownOpen(false);
  };

  const handleRefresh = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isInOurProductsSection = activeSection === 'our-products';


  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 shadow-md backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          onClick={handleRefresh}
          className="font-headline text-2xl font-bold text-primary"
        >
          {siteConfig.brandName}
        </a>
        <nav className="hidden items-center space-x-8 md:flex">
          {siteConfig.navLinks.map((link) =>
            link.href === '#our-products' ? (
              <DropdownMenu
                key={link.name}
                open={isProductDropdownOpen}
                onOpenChange={setIsProductDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <div
                    onMouseEnter={() => !isInOurProductsSection && setIsProductDropdownOpen(true)}
                    onMouseLeave={() => setIsProductDropdownOpen(false)}
                    className="flex items-center"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={cn(
                        'relative text-sm font-medium transition-colors hover:text-primary flex items-center gap-1',
                        'text-foreground/80',
                        'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300',
                        'after:scale-x-0 hover:after:scale-x-100',
                        activeSection === link.href.substring(1)
                          ? 'text-primary after:scale-x-100'
                          : ''
                      )}
                    >
                      {link.name}
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          isProductDropdownOpen ? 'rotate-180' : ''
                        )}
                      />
                    </a>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 data-[state=open]:animate-roll-down"
                  onMouseEnter={() => !isInOurProductsSection && setIsProductDropdownOpen(true)}
                  onMouseLeave={() => setIsProductDropdownOpen(false)}
                >
                  {siteProducts.map((product) => (
                    <DropdownMenuItem
                      key={product.id}
                      onSelect={() => handleProductItemClick(product.slug)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.imageUrls[0]}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={cn(
                  'relative text-sm font-medium transition-colors hover:text-primary',
                  'text-foreground/80',
                  'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300',
                  'after:scale-x-0 hover:after:scale-x-100',
                  activeSection === link.href.substring(1)
                    ? 'text-primary after:scale-x-100'
                    : ''
                )}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(true)}
            className={cn('relative', isCartAnimating && 'animate-shake')}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Open Cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
