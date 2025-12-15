import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck, PawPrint, Globe } from "lucide-react";

const safetyInfo = [
    {
        icon: ShieldCheck,
        title: "Dermatologically Tested",
        description: "Gentle on skin. Our formulas are hypoallergenic and free from common irritants."
    },
    {
        icon: PawPrint,
        title: "Pet & Family Safe",
        description: "Non-toxic formulation, safe for use around children and pets when used as directed."
    },
    {
        icon: Globe,
        title: "Eco-Conscious",
        description: "100% biodegradable ingredients and packaged in recycled materials."
    }
];

const SafetySection = () => {
    return (
        <section id="safety" className="bg-gray-200 dark:bg-secondary py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Safety Without Compromise</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                        Powerful cleaning shouldn't come at a cost.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {safetyInfo.map((item, index) => (
                        <Card key={index} className="flex flex-col items-center text-center p-6 bg-white dark:bg-secondary/80 backdrop-blur-sm">
                             <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <CardHeader className="p-0">
                                <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-2">
                                <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SafetySection;
