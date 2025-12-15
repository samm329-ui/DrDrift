'use client';

import React, { useRef } from 'react';
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
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/hooks/use-app';
import { siteProducts } from '@/lib/config';
import type { SiteProduct } from '@/types';
import { cn } from '@/lib/utils';

const ProductCard = ({ product }: { product: SiteProduct }) => {
  const { addToCart, buyNow } = useApp();
  const autoplayPlugin = useRef(Autoplay({ delay: 2000 + Math.random() * 1000, stopOnInteraction: true }));
  
  const originalPrice = Math.round(product.price * 1.25);

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
      <Card className="text-left shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col group bg-background dark:bg-background/80 backdrop-blur-sm border-white/20 min-w-[280px] sm:min-w-[300px]">
        <div className="relative overflow-hidden">
            <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10">
                 <span className="sr-only">View Details</span>
            </Link>
            <Carousel
              plugins={[autoplayPlugin.current]}
              className="w-full"
              onMouseEnter={autoplayPlugin.current.stop}
              onMouseLeave={autoplayPlugin.current.play}
            >
              <CarouselContent>
                {product.imageUrls.map((url, index) => (
                  <CarouselItem key={index}>
                      <Image
                          src={url}
                          alt={`${product.name} image ${index + 1}`}
                          width={600}
                          height={400}
                          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={product.imageHint}
                      />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
        </div>

        <div className="flex flex-col flex-grow p-4">
          <CardHeader className="p-0">
            <CardTitle className="font-headline text-lg">
              <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors z-30 relative">
                {product.name}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2 flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </CardContent>
          <CardFooter className="p-0 mt-4 flex flex-col items-stretch gap-2">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-lg text-primary">Rs. {product.price}</span>
                <span className="text-sm text-muted-foreground animate-strike-through">Rs. {originalPrice}</span>
              </div>
              <div className='flex items-center gap-2 w-full'>
                 <Button variant="outline" size="sm" className='w-full' onClick={handleAddToCart}>
                    <ShoppingCart className='mr-2 h-4 w-4'/>
                    Add to Cart
                 </Button>
                 <Button size="sm" className='w-full' onClick={handleBuyNow}>
                    Buy Now
                 </Button>
            </div>
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
