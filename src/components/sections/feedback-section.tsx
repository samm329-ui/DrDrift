'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';

const feedbackSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export function FeedbackSection() {
  const { toast } = useToast();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(data: FeedbackFormValues) {
    console.log('Feedback submitted:', data);
    toast({
      title: 'Feedback Sent!',
      description: "Thank you for your thoughts. We appreciate it!",
    });
    form.reset();
  }

  return (
    <section id="feedback" className={cn("bg-secondary py-20 md:py-24")}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline text-foreground">Share Your Feedback</h2>
                    <p className="mt-4 text-xl text-muted-foreground">
                        We'd love to hear from you! Let us know what you think.
                    </p>
                </div>
                <div className="feedback-form-container">
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="feedback-form" className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="feedback-form-label">Name</FormLabel>
                                    <FormControl>
                                        <Input className="feedback-form-input" placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="feedback-form-label">Email</FormLabel>
                                    <FormControl>
                                        <Input className="feedback-form-input" placeholder="your.email@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="feedback-form-label">Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="feedback-form-input"
                                        placeholder="Tell us what's on your mind..."
                                        rows={5}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-center">
                            <Button type="submit" size="lg" className="feedback-form-button">
                                Send Feedback <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                    </Form>
                </div>
            </div>
        </div>
    </section>
  );
}

export default FeedbackSection;
