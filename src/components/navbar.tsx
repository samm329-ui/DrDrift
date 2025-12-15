'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { Input } from '@/components/ui/input';
import { useScrollSpy } from '@/hooks/use-scroll-spy';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, setIsCartOpen, isCartAnimating, setSearchQuery } = useApp();
  
  const sectionIds = siteConfig.navLinks.map(link => link.href.substring(1));
  const activeSection = useScrollSpy(sectionIds.map(id => `#${id}`), {
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
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const handleRefresh = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
        <a href="/" onClick={handleRefresh} className="font-headline text-2xl font-bold text-primary">
          {siteConfig.brandName}
        </a>
        <nav className="hidden items-center space-x-8 md:flex">
          {siteConfig.navLinks.map((link) => (
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
          ))}
        </nav>
        <div className="flex items-center gap-2">
           <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
