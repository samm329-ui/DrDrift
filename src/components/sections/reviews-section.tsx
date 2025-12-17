import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const reviews = [
    {
        name: "Priya S.",
        text: "I'm genuinely impressed. My floors have never looked better, and I love that it's safe for my toddler and dog. The shine is real!",
        rating: 5,
    },
    {
        name: "Rohan K.",
        text: "As a professional cleaner, I'm very picky. Dr. Drift's Glaze Guard is now a staple in my kit. It cuts my window cleaning time in half.",
        rating: 5,
    },
    {
        name: "Anjali D.",
        text: "Finally, a bathroom cleaner that actually works on soap scum without toxic fumes. The bathroom smells fresh, not like chemicals.",
        rating: 5,
    }
];

const ReviewsSection = () => {
    return (
        <section id="reviews" className={cn("bg-background py-20 md:py-32", "bg-pattern-3")}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Loved by Homes Everywhere</h2>
                <p className="mt-4 max-w-2xl text-xl text-muted-foreground">
                    Don't just take our word for it. Here's what our customers have to say.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <div>
                                <div className="review-card-stars">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="review-card-star fill-current" />
                                    ))}
                                </div>
                                <div className="review-card-infos">
                                    <p className="review-card-description">
                                        &quot;{review.text}&quot;
                                    </p>
                                </div>
                            </div>
                            <div className="review-card-author">
                                <span className='font-semibold text-foreground/80'>{review.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
