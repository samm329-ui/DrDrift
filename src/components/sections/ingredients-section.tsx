'use client';

import { Leaf, FlaskConical, Droplets, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { useRef } from "react";

const ingredients = [
    {
        icon: Leaf,
        name: "Plant-Derived Surfactants",
        description: "Breaks down grime and dirt effectively without harsh chemicals, sourced from coconut and corn."
    },
    {
        icon: FlaskConical,
        name: "Bio-Enzymatic Blend",
        description: "A targeted mix of natural enzymes that digest stains and odors at their source for a deeper clean."
    },
    {
        icon: Droplets,
        name: "Natural Essential Oils",
        description: "Provides a subtle, fresh aroma while offering natural antibacterial properties. No synthetic fragrances."
    },
]

const IngredientsSection = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            const cardWidth = 256; // approx width of a card in px (w-64)
            const gap = 32; // gap between cards (gap-8)
            scrollContainerRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        }
    };
    
    return (
        <section id="ingredients" className={cn("bg-background relative overflow-hidden py-20 md:py-32")}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">The Science of Clean</h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Our formulas are a blend of nature's best and scientific precision.
                </p>
            </div>
            <div 
                ref={scrollContainerRef}
                className="mt-12 flex flex-nowrap gap-8 pb-4 overflow-x-auto no-scrollbar -ml-4 pl-8 md:grid md:grid-cols-3 md:px-4 md:ml-0 md:pl-4"
            >
                {ingredients.map((item, index) => (
                    <div key={index} className="ag-courses_item w-64 flex-shrink-0 md:w-auto">
                        <Link href="#" className="ag-courses-item_link">
                            <div className="ag-courses-item_bg"></div>
                            <div className="ag-courses-item_title">
                                {item.name}
                            </div>
                            <div className="ag-courses-item_date-box">
                                {item.description}
                            </div>
                        </Link>
                    </div>
                ))}
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

export default IngredientsSection;
