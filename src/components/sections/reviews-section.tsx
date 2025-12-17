
'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/hooks/use-app';
import Image from 'next/image';

const ReviewsSection = () => {
    const { reviews } = useApp();

    return (
        <section id="reviews" className={cn("bg-background relative overflow-hidden py-20 md:py-32")}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Loved by Homes Everywhere</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                        Don't just take our word for it. Here's what our customers have to say.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.slice(0, 3).map((review) => (
                        <div key={review.id} className="review-card">
                            <div>
                                <div className="review-card-stars">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="review-card-star fill-current" />
                                    ))}
                                    {[...Array(5 - review.rating)].map((_, i) => (
                                        <Star key={`empty-${i}`} className="review-card-star" />
                                    ))}
                                </div>
                                <div className="review-card-infos">
                                    <p className="review-card-description">
                                        &quot;{review.text}&quot;
                                    </p>
                                </div>
                            </div>
                            <div className="review-card-author">
                                <Image 
                                    src={review.avatarUrl}
                                    alt={review.name}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
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
