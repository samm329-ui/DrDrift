'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import ThemeToggle from '@/components/theme-toggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const sectionIds = siteConfig.navLinks.map(link => link.href);
  const activeId = useScrollSpy(sectionIds, { rootMargin: '-50% 0px -50% 0px' });

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
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={cn(
                'relative text-sm font-medium transition-colors hover:text-primary',
                activeId === link.href.substring(1) ? 'text-primary' : 'text-foreground/80',
                'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300',
                activeId === link.href.substring(1) ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
