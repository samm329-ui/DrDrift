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
import { Info, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/hooks/use-app';
import { siteProducts } from '@/lib/config';
import type { SiteProduct } from '@/types';

const ProductCard = ({ product }: { product: SiteProduct }) => {
  const [quantity, setQuantity] = useState(1);
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
    addToCart(item, quantity);
  };
  
  const handleBuyNow = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrls[0],
    };
    buyNow(item, quantity);
  };

  return (
      <Card className="text-left shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col group bg-background dark:bg-background/80 backdrop-blur-sm border-white/20">
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
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                <div className="flex items-center gap-1">
                    <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                    <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-10 text-center font-medium">{quantity}</span>
                    <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(quantity + 1)}
                    >
                    <Plus className="h-3.5 w-3.5" />
                    </Button>
                </div>
                <Button onClick={handleBuyNow} size="sm" className="flex-1">
                  Buy Now
                </Button>
            </div>
            <Button onClick={handleAddToCart} size="sm" variant="outline" className="w-full">
                Add to Cart
            </Button>
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
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
            {siteProducts.map((item, index) => (
                <ProductCard key={index} product={item} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default OurProductsSection;
