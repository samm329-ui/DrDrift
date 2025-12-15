import { Mail, Phone, MapPin } from "lucide-react";

const contactOptions = [
    {
        icon: Mail,
        title: "Email Us",
        content: "Click to send us an email",
        href: "https://mail.google.com/mail/?view=cm&fs=1&to=drdriftpvtltd@gmail.com"
    },
    {
        icon: Phone,
        title: "Call Us",
        content: "Click to give us a call",
        href: "tel:555-123-4567"
    },
    {
        icon: MapPin,
        title: "Visit Us",
        content: "Click to find us on the map",
        href: "https://www.google.com/maps/search/?api=1&query=11/10+Newland+Extension,+Jadavpur,+Jheel+Road,+700075,+Kolkata"
    },
]

const CtaSection = () => {
    return (
        <section id="contact" className="bg-secondary py-20 md:py-32">
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
                            <a href={option.href} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 group">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground transition-transform duration-200 ease-in-out group-hover:scale-110 group-active:scale-95">
                                    <option.icon className="h-6 w-6" />
                                </div>
                            </a>
                            <div className="mt-4">
                                <h3 className="text-lg font-medium leading-6 text-foreground font-headline">{option.title}</h3>
                                <p className="mt-2 text-base text-muted-foreground">
                                    <a href={option.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{option.content}</a>
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
