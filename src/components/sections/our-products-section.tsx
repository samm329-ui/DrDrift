'use client';

import React, { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/hooks/use-app';
import { siteProducts } from '@/lib/config';
import type { SiteProduct } from '@/types';

const ProductCard = ({ product }: { product: SiteProduct }) => {
  const { addToCart, buyNow } = useApp();
  const autoplayPlugin = useRef(Autoplay({ delay: 2000 + Math.random() * 1000, stopOnInteraction: true }));
  
  const originalPrice = Math.round(product.price * 1.25);

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrls[0],
    };
    addToCart(item, 1);
  };
  
  const handleBuyNow = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrls[0],
    };
    buyNow(item, 1);
  };

  return (
      <Card className="text-left shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col group bg-background dark:bg-background/80 backdrop-blur-sm border-white/20 min-w-[280px] sm:min-w-[300px]">
        <div className="relative">
            <Carousel
              plugins={[autoplayPlugin.current]}
              className="w-full"
              onMouseEnter={autoplayPlugin.current.stop}
              onMouseLeave={autoplayPlugin.current.play}
            >
              <CarouselContent>
                {product.imageUrls.map((url, index) => (
                  <CarouselItem key={index}>
                    <Link href={`/products/${product.slug}`}>
                      <Image
                          src={url}
                          alt={`${product.name} image ${index + 1}`}
                          width={600}
                          height={400}
                          className="w-full h-48 object-cover"
                          data-ai-hint={product.imageHint}
                      />
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
        </div>

        <div className="flex flex-col flex-grow">
          <CardHeader>
            <CardTitle className="font-headline text-lg">
              <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
                {product.name}
              </Link>
            </CardTitle>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-bold text-lg text-primary">Rs. {product.price}</span>
                <span className="text-sm text-muted-foreground animate-strike-through">Rs. {originalPrice}</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-2 bg-secondary/50 p-3 mt-auto">
             <div className="flex items-center justify-between gap-2">
                <Button onClick={handleBuyNow} size="sm" className="flex-1">
                  Buy Now
                </Button>
                <Button onClick={handleAddToCart} size="sm" variant="outline" className="flex-1">
                    Add to Cart
                </Button>
            </div>
             <Link href={`/products/${product.slug}`} className='w-full'>
                <Button variant="ghost" size="sm" className="w-full text-sm">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
            </Link>
          </CardFooter>
        </div>
      </Card>
  );
};


const OurProductsSection = () => {
  return (
    <section id="our-products" className="bg-background-alt py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">
          Our Products
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          A range of products to keep your home shining.
        </p>
        <div className="mt-12 flex gap-6 pb-4 -mx-4 px-4 overflow-x-auto">
            {siteProducts.map((item, index) => (
                <ProductCard key={index} product={item} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default OurProductsSection;
