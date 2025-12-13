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
                <h2 className="font-headline text-3xl md:text-4xl font-bold">The Science of Clean</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Our formulas are meticulously crafted with powerful, safe, and biodegradable ingredients. Transparency is at our core.
                </p>
                <div className="mt-12 grid md:grid-cols-3 gap-8">
                    {ingredients.map((item, index) => (
                        <Card key={index} className="text-left shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <CardTitle className="font-headline">{item.name}</CardTitle>
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
