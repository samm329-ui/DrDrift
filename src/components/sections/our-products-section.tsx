

'use client';

import React, { useRef, useState } from 'react';
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
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/use-app';
import type { SiteProduct } from '@/types';
import { cn } from '@/lib/utils';
import { siteProducts } from '@/lib/config';

const Spinner = () => (
    <div className="spinner center">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="spinner-blade" />
      ))}
    </div>
  );

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
      <Card 
        id={`product-card-${product.slug}`} 
        onClick={(e) => handleNavigate(e, `/products/${product.slug}`)}
        className="text-left overflow-hidden flex flex-col group w-[320px] sm:w-[380px] transition-all duration-500 bg-gray-200/50 dark:bg-gray-500/10 shadow-glass backdrop-blur-md rounded-[17px] hover:scale-105 active:scale-95 active:rotate-[1.7deg] cursor-pointer"
    >
        <div className="relative overflow-hidden rounded-t-[17px]">
            {isNavigating && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <Spinner />
                </div>
            )}
            <div className={cn("absolute inset-0 z-10", isNavigating ? "" : "group-hover:bg-black/10 transition-colors")}>
                 <span className="sr-only">View Details</span>
            </div>
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
                          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={product.imageHint}
                      />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100" />
              <CarouselNext className="right-2 opacity-0 group-hover:opacity-100" />
            </Carousel>
        </div>

        <div className="flex flex-col flex-grow p-4 bg-transparent rounded-b-[17px]">
          <CardHeader className="p-0">
            <CardTitle className="font-headline text-lg">
                <span className="hover:text-primary transition-colors z-30 relative text-black dark:text-white">
                    {product.name}
                </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2 flex-grow">
            <p className="text-sm text-black/60 dark:text-white/60 line-clamp-2">{product.description}</p>
             <div className="flex items-baseline gap-2 mt-4">
                <span className="font-bold text-lg text-primary">Rs. {product.price}</span>
                <span className="text-sm text-black/60 dark:text-white/60 line-through">Rs. {originalPrice}</span>
              </div>
          </CardContent>
          <CardFooter className='p-0 mt-auto pt-4'>
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
  const { filteredProducts, searchQuery } = useApp();

  const productsToShow = searchQuery ? filteredProducts : siteProducts;

  return (
    <section id="our-products" className="bg-background-alt py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col h-full">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">
          Our Products
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          A range of products to keep your home shining.
        </p>
        <div className="mt-12 flex-grow flex justify-center pb-4 -mx-4 px-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="grid grid-flow-col auto-cols-max justify-center gap-8">
              {productsToShow.map((item, index) => (
                  <ProductCard key={index} product={item} />
              ))}
            </div>
             {productsToShow.length === 0 && (
                <div className="w-full text-center text-muted-foreground py-10">
                    No products found.
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default OurProductsSection;
