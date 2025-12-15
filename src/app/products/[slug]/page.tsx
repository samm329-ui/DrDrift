'use client';

import React, { useState, useRef, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { siteProducts } from '@/lib/config';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Minus, Plus, CheckCircle, Sparkles } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { Separator } from '@/components/ui/separator';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, buyNow } = useApp();
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const product = useMemo(
    () => siteProducts.find((p) => p.slug === slug),
    [slug]
  );

  if (!product) {
    notFound();
  }

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

  const handleBuyPackOf8 = () => {
    const discountedPrice = Math.round(product.price * 0.92);
    const item = {
      id: `${product.id}-pack8`,
      name: `${product.name} (Pack of 8)`,
      price: discountedPrice,
      imageUrl: product.imageUrls[0],
    };
    buyNow(item, 8);
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image Carousel */}
          <div className="w-full">
            <Carousel
              className="w-full group"
            >
              <CarouselContent>
                {product.imageUrls.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative rounded-lg overflow-hidden border">
                      <Image
                        src={url}
                        alt={`${product.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHint}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>

            <div className="flex items-baseline gap-3">
              <span className="font-bold text-3xl text-primary">
                Rs. {product.price}
              </span>
              <span className="text-xl text-muted-foreground animate-strike-through">
                Rs. {originalPrice}
              </span>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3 font-headline">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2 border rounded-md p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-bold text-lg">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-grow w-full flex flex-col sm:flex-row gap-2">
                <Button onClick={handleAddToCart} size="lg" variant="outline" className="w-full">
                  Add to Cart
                </Button>
                <Button onClick={handleBuyNow} size="lg" className="w-full">
                  Buy Now
                </Button>
              </div>
            </div>
             <Button onClick={handleBuyPackOf8} size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                Buy Pack of 8 (8% OFF)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
