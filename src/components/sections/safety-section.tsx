

import { cn } from "@/lib/utils";
import Link from "next/link";

const safetyInfo = [
    {
        title: "Handling",
        description: "Always dilute as recommended. Use in a well-ventilated area and wear gloves for prolonged contact to ensure a safe and pleasant cleaning experience."
    },
    {
        title: "Warnings",
        description: "Do not mix with other cleaning agents. Avoid contact with eyes and direct ingestion. Keep bottles sealed and stored away from children and pets."
    },
    {
        title: "Recycle",
        description: "Our bottles are recyclable. Please rinse the container thoroughly and dispose of it in your local recycling bin to help protect our environment."
    }
];

const SafetySection = () => {
    return (
        <section id="safety" className="py-20 md:py-24 bg-secondary overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline text-foreground">Safety Without Compromise</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                        Powerful cleaning shouldn't come at a cost.
                    </p>
                </div>
            </div>
            <div className="mt-12 flex flex-nowrap gap-8 overflow-x-auto no-scrollbar md:grid md:grid-cols-3 md:px-4 -ml-4 pl-8 md:ml-0 md:pl-4">
                {safetyInfo.map((item, index) => (
                    <div key={index} className="ag-courses_item h-full w-64 flex-shrink-0 md:w-auto">
                        <Link href="#" className="ag-courses-item_link h-full">
                            <div className="ag-courses-item_bg"></div>
                            <div className="ag-courses-item_title font-headline">
                                {item.title}
                            </div>
                            <div className="ag-courses-item_date-box">
                                {item.description}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SafetySection;
