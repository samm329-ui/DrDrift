import { Mail, Phone, MapPin } from "lucide-react";

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
        <section id="contact" className="bg-secondary py-20 md:py-32 section-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">
                        Get In Touch
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground">
                        Have a question or want to work together?
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contactOptions.map(option => (
                        <div key={option.title} className="flex flex-col items-center text-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                                    <option.icon className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-medium leading-6 text-foreground font-headline">{option.title}</h3>
                                <p className="mt-2 text-base text-muted-foreground">
                                    <a href={option.href} className="hover:text-primary">{option.content}</a>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
