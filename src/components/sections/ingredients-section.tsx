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
]

const IngredientsSection = () => {
    return (
        <section id="ingredients" className="bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">The Science of Clean</h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Our formulas are a blend of nature's best and scientific precision.
                </p>
                <div className="mt-12 grid md:grid-cols-3 gap-8">
                    {ingredients.map((item, index) => (
                        <Card key={index} className="text-left bg-background">
                            <CardHeader>
                                <div className="bg-primary/10 text-primary w-12 h-12 rounded-md flex items-center justify-center mb-4">
                                    <item.icon className="w-6 h-6" />
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
