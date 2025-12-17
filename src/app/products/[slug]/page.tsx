
'use client';

import React, { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { siteProducts } from '@/lib/config';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Minus, Plus, CheckCircle, Leaf, Truck, ShieldCheck } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ReviewForm } from '@/components/review-form';
import { PackButton } from '@/components/ui/pack-button';
import { AddToCartButton } from '@/components/ui/add-to-cart-button';

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const handlePackBuy = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrls[0],
    };
    buyNow(item, 8);
  };

  const PurchaseActions = () => (
    <div className="space-y-6">
        <div className="flex items-baseline gap-3">
            <span className="font-bold text-3xl text-primary">
            Rs. {product.price}
            </span>
            <span className="text-xl text-muted-foreground animate-strike-through">
            Rs. {originalPrice}
            </span>
        </div>

        <Separator />
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 border rounded-full p-1">
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
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
                className="h-8 w-8 rounded-full"
                onClick={() => setQuantity(quantity + 1)}
            >
                <Plus className="h-4 w-4" />
            </Button>
            </div>

            <div className="flex-grow w-full flex items-center gap-2">
            <AddToCartButton onClick={handleAddToCart} className="flex-grow basis-0 justify-center" />
            <button onClick={handleBuyNow} className="hero-buy-now-btn flex-grow basis-0 justify-center text-black">
                <span>Buy Now</span>
            </button>
            </div>
        </div>
        
        <PackButton onClick={handlePackBuy} />
    </div>
  )

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image Column */}
          <div className="w-full space-y-4">
            <Carousel className="w-full group">
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
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            
            <div className="md:hidden mt-8 space-y-6">
              <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                {product.name}
              </h1>
              <PurchaseActions />
            </div>

            <div className="hidden md:block mt-8 space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
                    <Leaf className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-foreground">Eco-Friendly</h4>
                        <p className="text-sm text-muted-foreground">Made with sustainable, plant-based ingredients.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
                    <Truck className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-foreground">Fast Delivery</h4>
                        <p className="text-sm text-muted-foreground">Get your order delivered to your doorstep in 2-3 days.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
                    <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-foreground">Secure Payments</h4>
                        <p className="text-sm text-muted-foreground">Cash on delivery and secure online payments.</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="hidden md:block font-headline text-4xl md:text-5xl font-bold text-foreground">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>

            <div className="hidden md:block">
              <PurchaseActions />
            </div>

            <Separator />

            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="features">
                <AccordionTrigger className="text-lg px-4 py-3 bg-muted/50 rounded-md">
                  Features
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <ul className="space-y-2 pl-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="review">
                <AccordionTrigger className="text-lg px-4 py-3 bg-muted/50 rounded-md">
                  Write a review
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <ReviewForm productId={product.id} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
