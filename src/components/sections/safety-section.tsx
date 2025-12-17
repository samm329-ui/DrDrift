
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck, PawPrint, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <section id="safety" className="bg-background-alt py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Safety Without Compromise</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                        Powerful cleaning shouldn't come at a cost.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
                    {safetyInfo.map((item, index) => (
                        <div key={index} className="group relative w-full max-w-[300px] h-[200px] [perspective:1000px] mx-auto">
                            <div className="relative w-full h-full rounded-lg bg-background dark:bg-secondary/80 flex items-center justify-center overflow-hidden transition-all duration-500 ease-custom-bezier group-hover:scale-105 shadow-md group-hover:shadow-xl dark:shadow-black/20">
                                <item.icon className="w-12 h-12 text-primary transition-all duration-500 ease-custom-bezier group-hover:scale-0" />
                                
                                <div className="absolute top-0 left-0 w-full h-full p-5 box-border bg-background dark:bg-secondary/90 text-center [transform-style:preserve-3d] [transform:rotateX(-90deg)] [transform-origin:bottom] transition-all duration-500 ease-custom-bezier group-hover:[transform:rotateX(0deg)]">
                                    <h3 className="font-headline text-xl text-foreground">{item.title}</h3>
                                    <p className="mt-2 text-muted-foreground text-sm leading-snug">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SafetySection;
