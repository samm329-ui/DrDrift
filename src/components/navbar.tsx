'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, setIsCartOpen, isCartAnimating } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-headline text-2xl font-bold text-primary">
          {siteConfig.brandName}
        </Link>
        <nav className="hidden items-center space-x-8 md:flex">
          {siteConfig.navLinks.map(link => (
            <Popover key={link.name}>
              <PopoverTrigger asChild>
                <Link
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={cn(
                    'relative text-sm font-medium transition-colors hover:text-primary',
                    'text-foreground/80',
                    'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300',
                    'after:scale-x-0 hover:after:scale-x-100'
                  )}
                >
                  {link.name}
                </Link>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image src={link.preview} alt={`Preview of ${link.name}`} fill className="object-cover" />
                </div>
                 <div className="p-4">
                  <h4 className="font-semibold">{link.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">Hover to preview this section.</p>
                </div>
              </PopoverContent>
            </Popover>
          ))}
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
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
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
