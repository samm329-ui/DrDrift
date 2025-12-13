import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contactOptions = [
    {
        icon: Mail,
        title: "Email Us",
        content: "contact@drdrift.com",
        href: "mailto:contact@drdrift.com"
    },
    {
        icon: Phone,
        title: "Call Us",
        content: "(555) 123-4567",
        href: "tel:555-123-4567"
    },
    {
        icon: MapPin,
        title: "Visit Us",
        content: "123 Clean St, Sparkle City",
        href: "#"
    },
]

const CtaSection = () => {
    return (
        <section id="contact" className="bg-gradient-to-r from-blue-500 to-blue-600">
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

                <div className="pt-16 pb-8">
                     <h3 className="font-headline text-3xl font-bold text-white text-center mb-10">
                        Get In Touch
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                        {contactOptions.map(option => (
                             <a key={option.title} href={option.href} className="block group">
                                <Card className="bg-white/10 hover:bg-white/20 transition-all duration-300 border-white/20 h-full text-center">
                                    <CardHeader className="items-center">
                                        <div className="p-3 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                                            <option.icon className="w-7 h-7 text-white" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardTitle className="text-xl font-bold">{option.title}</CardTitle>
                                        <p className="text-white/80 mt-2">{option.content}</p>
                                    </CardContent>
                                </Card>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
