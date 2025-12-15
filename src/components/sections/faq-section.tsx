import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
    {
        question: "Are Dr. Drift products safe for pets and children?",
        answer: "Yes, all our products are formulated with non-toxic, biodegradable ingredients that are safe for use around your entire family, including furry friends, when used as directed."
    },
    {
        question: "Can I use the floor cleaner on hardwood floors?",
        answer: "Absolutely. Our Aura Floor cleaner is pH-neutral and specially designed to be safe and effective on all sealed hard surfaces, including hardwood, tile, laminate, and vinyl."
    },
    {
        question: "Are your products tested on animals?",
        answer: "No. We are proud to be a cruelty-free brand. None of our products or ingredients are ever tested on animals."
    },
    {
        question: "What makes your ingredients 'science-driven'?",
        answer: "Our team of chemists selects each ingredient for its proven effectiveness and safety profile, based on the latest scientific research. We prioritize bio-enzymatic and plant-derived compounds that deliver powerful results sustainably."
    }
];

const FaqSection = () => {
    return (
        <section id="faq" className="bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Frequently Asked Questions</h2>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
                        Have questions? We have answers. Find information about our products, ingredients, and policies right here.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="bg-secondary/50 rounded-xl border-b-0">
                                <AccordionTrigger className="text-left font-bold text-lg px-6 py-4 hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base px-6">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export default FaqSection;
