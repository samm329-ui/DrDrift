import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, FlaskConical, Droplets } from "lucide-react";

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
];

const IngredientsSection = () => {
    return (
        <section id="ingredients" className="bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">The Science of Clean</h2>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
                    Our formulas are meticulously crafted with powerful, safe, and biodegradable ingredients. Transparency is at our core because you deserve to know what's in your home.
                </p>
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {ingredients.map((item, index) => (
                        <Card key={index} className="text-left bg-background rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-transparent">
                            <CardHeader>
                                <div className="bg-primary/10 text-primary w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <CardTitle className="font-headline text-xl">{item.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IngredientsSection;
