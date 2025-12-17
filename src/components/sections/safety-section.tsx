import { cn } from "@/lib/utils";

const safetyInfo = [
    {
        title: "How to Use",
        description: "Always dilute as recommended. Use in a well-ventilated area and wear gloves for prolonged contact to ensure a safe and pleasant cleaning experience."
    },
    {
        title: "What to Avoid",
        description: "Do not mix with other cleaning agents. Avoid contact with eyes and direct ingestion. Keep bottles sealed and stored away from children and pets."
    },
    {
        title: "Responsible Disposal",
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
                        <div key={index} className="group relative w-full max-w-[300px] h-[180px] [perspective:1000px] mx-auto">
                            <div className="relative w-full h-full rounded-lg bg-background-alt flex items-center justify-center overflow-hidden transition-all duration-500 ease-custom-bezier group-hover:scale-105 shadow-md group-hover:shadow-xl dark:border-transparent">
                               <h3 className="font-headline text-2xl font-extrabold text-foreground dark:text-primary transition-all duration-500 ease-custom-bezier group-hover:scale-0">{item.title}</h3>
                                
                                <div className="absolute top-0 left-0 w-full h-full p-5 box-border bg-background-alt text-center [transform-style:preserve-3d] [transform:rotateX(-90deg)] [transform-origin:bottom] transition-all duration-500 ease-custom-bezier group-hover:[transform:rotateX(0deg)]">
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
