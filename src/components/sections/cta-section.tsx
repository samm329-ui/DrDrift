import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contactOptions = [
    {
        icon: Mail,
        title: "Email Us",
        content: "drdriftpvtltd@gmail.com",
        href: "mailto:drdriftpvtltd@gmail.com"
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
        content: "11/10 Newland Extension, Jadavpur, Jheel Road, 700075",
        href: "#"
    },
]

const CtaSection = () => {
    return (
        <section id="contact" className="bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center py-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                        Ready for a Deeper Clean?
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground">
                        Join the thousands of homes that have upgraded to the Dr. Drift standard of clean.
                    </p>
                </div>

                <div className="pb-16 pt-8">
                     <h3 className="font-headline text-3xl font-bold text-foreground text-center mb-10">
                        Get In Touch
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactOptions.map(option => (
                             <a key={option.title} href={option.href} className="block group">
                                <Card className="bg-background hover:border-primary transition-all duration-300 h-full text-center shadow-lg hover:shadow-xl">
                                    <CardHeader className="items-center">
                                        <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                                            <option.icon className="w-7 h-7 text-primary" />
                                        </div>

                                    </CardHeader>
                                    <CardContent>
                                        <CardTitle className="text-xl font-bold">{option.title}</CardTitle>
                                        <p className="text-muted-foreground mt-2">{option.content}</p>
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
