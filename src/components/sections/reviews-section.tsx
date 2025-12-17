'use client';

import { Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/hooks/use-app';
import Image from 'next/image';
import { useRef } from 'react';

const ReviewsSection = () => {
    const { reviews } = useApp();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            const cardWidth = 320; // approx width of a card in px (w-80)
            const gap = 32; // gap between cards (gap-8)
            scrollContainerRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        }
    };

    return (
        <section id="reviews" className={cn("bg-background relative overflow-hidden py-20 md:py-32")}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">Loved by Homes Everywhere</h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Don't just take our word for it. Here's what our customers have to say.
                </p>
            </div>
            <div 
                ref={scrollContainerRef}
                className="mt-12 flex flex-nowrap gap-8 pb-4 overflow-x-auto no-scrollbar -ml-4 pl-8 md:grid md:grid-cols-3 md:px-4 md:ml-0 md:pl-4"
            >
                {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="review-card w-80 flex-shrink-0 md:w-auto">
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
             <div className="mt-4 text-center md:hidden">
                <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    Swipe right for more
                    <button onClick={handleScrollRight} className="p-1 rounded-full transition-transform duration-200 ease-in-out active:scale-125">
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </p>
            </div>
        </section>
    );
};

export default ReviewsSection;
