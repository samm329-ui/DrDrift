'use client';
import Image from 'next/image';
import { useApp } from '@/hooks/use-app';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const ProductSection = () => {
    const { currentProduct } = useApp();

    const features = [
        "Professional-grade hygiene",
        "Science-driven formulation",
        "Eco-friendly ingredients",
        "Leaves a lasting fresh scent"
    ];

    return (
        <section id="product" className="bg-secondary py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Pure Power, Clean Conscience</h2>
                        <p className="mt-6 text-xl text-muted-foreground">
                            Dr. Drift represents the new standard in home cleaning. We merge potent, lab-tested formulas with eco-conscious practices to deliver a superior clean that you can feel good about.
                        </p>
                        <ul className="mt-8 space-y-3">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center text-lg text-foreground">
                                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-1 md:order-2">
                         <Card className="overflow-hidden shadow-2xl rounded-2xl border-white/10 bg-black/20 backdrop-blur-lg">
                            <CardContent className="p-0">
                                <Image
                                    key={currentProduct.id}
                                    src={currentProduct.productImageUrl}
                                    alt={currentProduct.name}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover transition-opacity duration-500 ease-in-out"
                                    data-ai-hint="clean home"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
