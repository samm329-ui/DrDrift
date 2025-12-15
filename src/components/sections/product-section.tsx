'use client';
import Image from 'next/image';
import { useApp } from '@/hooks/use-app';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React, { useRef } from 'react';
import { siteProducts } from '@/lib/config';

const ProductSection = () => {
    const { currentProduct } = useApp();
    const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

    const features = [
        "Professional-grade hygiene",
        "Science-driven formulation",
        "Eco-friendly ingredients",
        "Leaves a lasting fresh scent"
    ];

    return (
        <section id="product" className="relative bg-background-alt dark:bg-background py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
                 <Carousel
                    plugins={[autoplayPlugin.current]}
                    className="w-full h-full"
                    opts={{ loop: true }}
                >
                    <CarouselContent className="h-full">
                        {siteProducts.map((product) => (
                            <CarouselItem key={product.id} className="h-full">
                                <div className="w-full h-full relative">
                                    <Image
                                        src={product.imageUrls[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={product.imageHint}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="absolute inset-0 bg-black/50 z-10"></div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-white">
                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Pure Power, Clean Conscience</h2>
                        <p className="mt-6 text-xl text-white/90">
                            Dr. Drift represents the new standard in home cleaning. We merge potent, lab-tested formulas with eco-conscious practices to deliver a superior clean that you can feel good about.
                        </p>
                        <p className="mt-6 text-xs text-white/70">
                            Pack of 8 is now available with offers!
                        </p>
                        <ul className="mt-2 space-y-3">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center text-lg text-white">
                                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* This column is intentionally left empty for spacing on larger screens */}
                    <div></div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
