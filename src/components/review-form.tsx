
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

const InteractiveRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  return (
    <div className="interactive-rating">
      {[5, 4, 3, 2, 1].map((value) => (
        <React.Fragment key={value}>
          <input
            type="radio"
            id={`star-${value}`}
            name="rating"
            value={value}
            checked={rating === value}
            onChange={() => setRating(value)}
          />
          <label htmlFor={`star-${value}`}>
            <svg
              className="star-bg h-8 w-8"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m12 18.26-6.51 3.75a1 1 0 0 1-1.45-1.05l1.63-7.23-5.59-4.83a1 1 0 0 1 .55-1.7l7.3-.64L11.5 0a1 1 0 0 1 1 0l3.03 6.56 7.3.64a1 1 0 0 1 .55 1.7l-5.59 4.83 1.63 7.23a1 1 0 0 1-1.45 1.05L12 18.26Z"
              ></path>
            </svg>
            <svg
              className="star-fg h-8 w-8"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m12 18.26-6.51 3.75a1 1 0 0 1-1.45-1.05l1.63-7.23-5.59-4.83a1 1 0 0 1 .55-1.7l7.3-.64L11.5 0a1 1 0 0 1 1 0l3.03 6.56 7.3.64a1 1 0 0 1 .55 1.7l-5.59 4.83 1.63 7.23a1 1 0 0 1-1.45 1.05L12 18.26Z"
              ></path>
            </svg>
            <div className="star-shadow"></div>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export const ReviewForm = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        variant: 'destructive',
        title: 'Rating required',
        description: 'Please select a star rating.',
      });
      return;
    }
    setIsSubmitting(true);
    console.log({ productId, rating, review });

    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Review submitted!',
        description: 'Thank you for your feedback.',
      });
      setRating(0);
      setReview('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center gap-2">
        <p className="font-medium">Your rating</p>
        <InteractiveRating rating={rating} setRating={setRating} />
      </div>
      <div>
        <Textarea
          placeholder="Tell us what you think..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};
