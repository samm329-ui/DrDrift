import { Button } from "@/components/ui/button";

const CtaSection = () => {
    return (
        <section id="contact" className="bg-blue-600">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center py-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-white">
                        Ready for a Deeper Clean?
                    </h2>
                    <p className="mt-4 text-xl text-white/80">
                        Join the thousands of homes that have upgraded to the Dr. Drift standard of clean.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                            Shop All Products
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
