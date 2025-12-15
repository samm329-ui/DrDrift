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
import { useApp } from '@/hooks/use-app';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const checkoutSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  contactNumber: z.string().min(10, { message: 'Please enter a valid contact number.' }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
    subtotal: number;
    onBack: () => void;
}

export function CheckoutForm({ subtotal, onBack }: CheckoutFormProps) {
  const { clearCart, setIsCartOpen } = useApp();
  const { toast } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: '',
      address: '',
      contactNumber: '',
    },
  });

  function onSubmit(data: CheckoutFormValues) {
    console.log('Order placed:', { ...data, subtotal });
    toast({
      title: 'Order Placed!',
      description: "We've received your order. You'll pay on delivery.",
    });
    clearCart();
    setIsCartOpen(false);
  }

  return (
    <div className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold">Shipping Details</h3>
        </div>
        <ScrollArea className="flex-grow pr-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Shipping Address</FormLabel>
                        <FormControl>
                            <Input placeholder="123 Main St, Anytown, USA" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </form>
            </Form>
        </ScrollArea>
        <div className="mt-auto pt-4 space-y-4">
            <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
             <p className="text-sm text-muted-foreground">Payment Method: Cash on Delivery</p>
            <Button onClick={form.handleSubmit(onSubmit)} className="w-full">
                Place Order
            </Button>
        </div>
    </div>
  );
}
