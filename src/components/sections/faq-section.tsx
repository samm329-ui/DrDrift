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
        <section id="faq" className="bg-background py-20 md:py-32 section-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Frequently Asked Questions</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                        Have questions? We have answers.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left font-semibold">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
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
