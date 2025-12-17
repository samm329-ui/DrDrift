
'use client';
import Image from 'next/image';
import { useApp } from '@/hooks/use-app';
import { CheckCircle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React, { useRef } from 'react';
import { siteProducts } from '@/lib/config';
import { cn } from '@/lib/utils';

const ProductSection = () => {
    const autoplayPlugins = [
        useRef(Autoplay({ delay: 2000, stopOnInteraction: false })),
        useRef(Autoplay({ delay: 3000, stopOnInteraction: false })),
        useRef(Autoplay({ delay: 2500, stopOnInteraction: false }))
    ];

    const features = [
        "Professional-grade hygiene",
        "Science-driven formulation",
        "Eco-friendly ingredients",
        "Leaves a lasting fresh scent"
    ];

    return (
        <section id="product" className={cn("relative bg-background dark:bg-background py-20 md:py-32 overflow-hidden")}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Pure Power, Clean Conscience</h2>
                        <p className="mt-6 text-xl text-muted-foreground">
                            Dr. Drift represents the new standard in home cleaning. We merge potent, lab-tested formulas with eco-conscious practices to deliver a superior clean that you can feel good about.
                        </p>
                        <ul className="mt-8 space-y-3">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center text-lg text-foreground justify-center md:justify-start">
                                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-0">
                        {siteProducts.map((product, productIndex) => (
                             <Carousel
                                key={product.id}
                                plugins={autoplayPlugins[productIndex] ? [autoplayPlugins[productIndex].current] : []}
                                className="w-full"
                                opts={{ loop: true }}
                            >
                                <CarouselContent className="-ml-0">
                                    {product.imageUrls.map((url, imgIndex) => (
                                        <CarouselItem key={imgIndex} className="pl-0">
                                            <div className="aspect-video relative">
                                                <Image
                                                    src={url}
                                                    alt={`${product.name} image ${imgIndex + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    data-ai-hint={product.imageHint}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;



