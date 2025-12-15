'use client';

import React, { useRef, useEffect } from 'react';
import { useApp } from '@/hooks/use-app';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import TwitterIcon from '@/components/icons/twitter';
import InstagramIcon from '@/components/icons/instagram';
import Link from 'next/link';
import SearchBar from '../search-bar';

const SocialLinks = () => (
    <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transform">
        <div className="flex items-center space-x-6">
            <Link href={siteConfig.socials.twitter} target="_blank" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5 text-foreground/70 transition-colors hover:text-primary" />
            </Link>
            <Link href={siteConfig.socials.instagram} target="_blank" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5 text-foreground/70 transition-colors hover:text-primary" />
            </Link>
        </div>
    </div>
)

const HeroSection = () => {
  const { currentProduct, isSwitching } = useApp();
  const mediaRef = useRef<HTMLVideoElement | HTMLImageElement>(null);
  
  const isVideo = currentProduct.animatedWebpUrl.endsWith('.mp4') || currentProduct.animatedWebpUrl.endsWith('.webm');

  useEffect(() => {
    const handleScroll = () => {
      if (mediaRef.current) {
        const scrollY = window.scrollY;
        const scale = 1 + scrollY * 0.0001;
        const translateY = scrollY * 0.1;
        mediaRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement>, selector: string) => {
    e.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden p-0">
      <div className="absolute top-0 left-0 right-0 z-30 p-4">
        <SearchBar />
      </div>
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <div className="absolute inset-0">
        {isVideo ? (
            <video
              key={currentProduct.id}
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              className="absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-500"
              autoPlay
              loop
              muted
              playsInline
              src={currentProduct.animatedWebpUrl}
            />
        ) : (
            <img
                key={currentProduct.id}
                ref={mediaRef as React.RefObject<HTMLImageElement>}
                src={currentProduct.animatedWebpUrl}
                alt="Animated background"
                className="absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-500"
                data-ai-hint="abstract animation"
            />
        )}
      </div>

      <div className="container relative z-20 mx-auto grid h-full items-center px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-md text-white transition-opacity duration-300 md:col-span-1", isSwitching ? 'opacity-0' : 'opacity-100')}>
            <h1 className="font-headline text-5xl font-bold uppercase tracking-widest md:text-7xl text-white">
              {currentProduct.name}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/80">{currentProduct.subtitle}</p>
            <p className="mt-6 max-w-prose text-base text-white/70">{currentProduct.description}</p>
            <div className="mt-8 flex space-x-4">
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black" onClick={(e) => handleScrollTo(e, '#product')}>
                    Learn More
                </Button>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600" onClick={(e) => handleScrollTo(e, '#our-products')}>
                    Buy Now
                </Button>
            </div>
        </div>
      </div>
      
      <SocialLinks />

    </section>
  );
};

export default HeroSection;
