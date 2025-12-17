import { Leaf, FlaskConical, Droplets } from "lucide-react";
import Link from 'next/link';
import { cn } from "@/lib/utils";

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
    return (
        <section id="ingredients" className={cn("bg-background-alt relative overflow-hidden py-20 md:py-32")}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">The Science of Clean</h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Our formulas are a blend of nature's best and scientific precision.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ingredients.map((item, index) => (
                        <div key={index} className="ag-courses_item">
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
            </div>
        </section>
    );
};

export default IngredientsSection;
