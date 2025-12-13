import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, WashingMachine, SprayCan } from "lucide-react";
import Image from "next/image";

const ourProducts = [
    {
        icon: SprayCan,
        name: "Toilet Cleaner",
        description: "Powerful formula that removes tough stains and kills 99.9% of germs, leaving your toilet sparkling clean and fresh.",
        imageUrl: "https://picsum.photos/seed/toilet/600/400",
        imageHint: "toilet cleaner"
    },
    {
        icon: Wrench,
        name: "Floor Cleaners",
        description: "Our floor cleaner cuts through grease and grime, leaving your floors spotless and with a brilliant shine. Safe for all floor types.",
        imageUrl: "https://picsum.photos/seed/floor/600/400",
        imageHint: "floor cleaner"
    },
    {
        icon: WashingMachine,
        name: "Dishwasher",
        description: "Advanced cleaning for your dishwasher, removing limescale and buildup to ensure your dishes come out sparkling clean every time.",
        imageUrl: "https://picsum.photos/seed/dishwasher/600/400",
        imageHint: "dishwasher tablets"
    },
];

const OurProductsSection = () => {
    return (
        <section id="our-products" className="bg-background pt-0 md:pt-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Products</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    A range of products to keep your home shining.
                </p>
                <div className="mt-12 grid md:grid-cols-3 gap-8">
                    {ourProducts.map((item, index) => (
                        <Card key={index} className="text-left shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                             <Image
                                src={item.imageUrl}
                                alt={item.name}
                                width={600}
                                height={400}
                                className="w-full h-48 object-cover"
                                data-ai-hint={item.imageHint}
                            />
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="font-headline">{item.name}</CardTitle>
                                </div>
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

export default OurProductsSection;
