
'use client';

import React, { useRef, useState, useMemo } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/use-app';
import type { SiteProduct, Review } from '@/types';
import { cn } from '@/lib/utils';
import { siteProducts } from '@/lib/config';
import { AddToCartButton } from '../ui/add-to-cart-button';

const Spinner = () => (
    <div className="spinner center">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="spinner-blade" />
      ))}
    </div>
  );

const ProductRating = ({ productId }: { productId: string }) => {
    const { reviews } = useApp();

    const productReviews = useMemo(() => reviews.filter(r => r.productId === productId), [reviews, productId]);

    if (productReviews.length === 0) {
        return (
            <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-muted-foreground/50" />
                <span className="text-sm text-muted-foreground">No reviews yet</span>
            </div>
        )
    }

    const avgRating = productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length;

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={cn("h-4 w-4", avgRating > i ? "fill-current" : "")}
                    />
                ))}
            </div>
            <span className="text-sm text-muted-foreground">({productReviews.length})</span>
        </div>
    )
}

const ProductCard = ({ product }: { product: SiteProduct }) => {
  const { addToCart, buyNow } = useApp();
  const autoplayPlugin = useRef(Autoplay({ delay: 2000 + Math.random() * 1000, stopOnInteraction: true }));
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  
  const originalPrice = Math.round(product.price * 1.25);

  const handleNavigate = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsNavigating(true);
    router.push(href);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrls[0],
    };
    addToCart(item, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrls[0],
    };
    buyNow(item, 1);
  };

  return (
    <div
      id={`product-card-${product.slug}`}
      onClick={(e) => handleNavigate(e, `/products/${product.slug}`)}
      className="neumorphic-card w-[190px] h-[254px] p-4 flex flex-col justify-between cursor-pointer"
    >
        {isNavigating && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-[50px]">
                <Spinner />
            </div>
        )}
        <div className="w-full h-24 rounded-3xl overflow-hidden">
            <Carousel
                plugins={[autoplayPlugin.current]}
                className="w-full h-full"
                onMouseEnter={autoplayPlugin.current.stop}
                onMouseLeave={autoplayPlugin.current.play}
                opts={{loop: true}}
            >
                <CarouselContent>
                    {product.imageUrls.map((url, index) => (
                    <CarouselItem key={index}>
                        <Image
                            src={url}
                            alt={`${product.name} image ${index + 1}`}
                            width={158}
                            height={96}
                            className="w-full h-full object-cover"
                            data-ai-hint={product.imageHint}
                        />
                    </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
        
        <div className="flex flex-col gap-1 text-center">
            <span className="text-primary font-bold text-xs">{product.name}</span>
            <div className="flex items-baseline justify-center gap-2">
                <span className="font-bold text-xl text-foreground">
                    Rs. {product.price}
                </span>
            </div>
            <ProductRating productId={product.id} />
        </div>
        
        <div className="flex flex-col items-center gap-2 w-full">
            <AddToCartButton
              onClick={handleAddToCart}
              className="w-full h-9 text-xs"
            />
            <button
              onClick={handleBuyNow}
              className="hero-buy-now-btn w-full justify-center text-black h-9 !py-0 text-xs"
            >
              <span>Buy Now</span>
            </button>
        </div>
    </div>
  );
};


const OurProductsSection = () => {
  const { filteredProducts, searchQuery } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const productsToShow = searchQuery ? filteredProducts : siteProducts;

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 190;
      const gap = 24; // gap-6
      scrollContainerRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  };

  return (
    <section id="our-products" className="py-20 md:py-24 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col h-full">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline text-foreground">
          Our Products
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          A range of products to keep your home shining.
        </p>
      </div>
       <div 
          ref={scrollContainerRef}
          className="mt-12 flex flex-nowrap gap-6 pb-4 overflow-x-auto no-scrollbar md:grid md:grid-cols-3 md:gap-8 md:justify-items-center -ml-4 pl-8 md:ml-0 md:px-4"
        >
              {productsToShow.map((item, index) => (
                  <div key={index} className="flex-shrink-0 md:w-auto flex justify-center">
                    <ProductCard product={item} />
                  </div>
              ))}
             {productsToShow.length === 0 && (
                <div className="w-full text-center text-muted-foreground py-10 col-span-3">
                    No products found.
                </div>
            )}
        </div>
        <div className="mt-4 text-center md:hidden">
            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                Swipe right for more
                <button onClick={handleScrollRight} className="p-1 rounded-full transition-transform duration-200 ease-in-out active:scale-125">
                    <ArrowRight className="h-4 w-4" />
                </button>
            </p>
        </div>
    </section>
  );
};

export default OurProductsSection;
