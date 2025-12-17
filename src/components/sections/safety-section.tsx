
import { cn } from "@/lib/utils";

const safetyInfo = [
    {
        title: "Do's",
        description: "Always dilute as recommended. Use in a well-ventilated area and wear gloves for prolonged contact to ensure a safe and pleasant cleaning experience."
    },
    {
        title: "Dont's",
        description: "Do not mix with other cleaning agents. Avoid contact with eyes and direct ingestion. Keep bottles sealed and stored away from children and pets."
    },
    {
        title: "Recycle",
        description: "Our bottles are recyclable. Please rinse the container thoroughly and dispose of it in your local recycling bin to help protect our environment."
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
                        <div key={index} className="group relative w-full max-w-[300px] h-[180px] mx-auto">
                            <div className="relative w-full h-full rounded-lg bg-background flex items-center justify-center overflow-hidden transition-all duration-500 ease-custom-bezier group-hover:scale-105 shadow-md group-hover:shadow-xl dark:border dark:border-border/20">
                               <h3 className="font-headline text-xl font-extrabold text-foreground dark:text-primary transition-all duration-500 ease-custom-bezier group-hover:scale-0 group-hover:opacity-0">{item.title}</h3>
                                
                                <div className="absolute inset-0 w-full h-full p-5 box-border bg-background text-center flex items-center justify-center opacity-0 transition-opacity duration-500 ease-custom-bezier group-hover:opacity-100">
                                    <p className="text-muted-foreground text-sm leading-snug">{item.description}</p>
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
