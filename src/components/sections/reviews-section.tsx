import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const reviews = [
    {
        name: "Jessica M.",
        avatarId: "review-avatar-1",
        text: "I'm genuinely impressed. My floors have never looked better, and I love that it's safe for my toddler and dog. The shine is real!",
        rating: 5,
    },
    {
        name: "David L.",
        avatarId: "review-avatar-2",
        text: "As a professional cleaner, I'm very picky. Dr. Drift's Glaze Guard is now a staple in my kit. It cuts my window cleaning time in half.",
        rating: 5,
    },
    {
        name: "Samantha P.",
        avatarId: "review-avatar-3",
        text: "Finally, a bathroom cleaner that actually works on soap scum without toxic fumes. The bathroom smells fresh, not like chemicals.",
        rating: 5,
    }
];

const getAvatarUrl = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

const ReviewsSection = () => {
    return (
        <section id="reviews" className="bg-background-alt dark:bg-background py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Loved by Homes Everywhere</h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Don't just take our word for it. Here's what our customers have to say.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <Card key={index} className="bg-background dark:bg-background/80 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <Image
                                    src={getAvatarUrl(review.avatarId)}
                                    alt={review.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full mx-auto mb-4 border-2 border-primary/50"
                                    data-ai-hint="person face"
                                />
                                <h3 className="font-bold text-lg font-headline">{review.name}</h3>
                                <div className="flex justify-center my-2">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <blockquote className="text-muted-foreground italic">
                                    "{review.text}"
                                </blockquote>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
