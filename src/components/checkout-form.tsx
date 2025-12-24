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
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { useState } from 'react';
import { sendOrderToSheet } from '@/ai/flows/send-order-to-sheet';
import { format } from 'date-fns';

const checkoutSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  contactNumber: z.string().min(10, { message: 'Please enter a valid contact number.' }),
  street: z.string().min(3, { message: 'Street is required.' }),
  house: z.string().min(1, { message: 'House name/number is required.' }),
  address: z.string().optional(),
  pincode: z.string().min(6, { message: 'Please enter a valid 6-digit pincode.' }).max(6, { message: 'Please enter a valid 6-digit pincode.'}),
  landmark: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
    subtotal: number;
    onBack: () => void;
}

export function CheckoutForm({ subtotal, onBack }: CheckoutFormProps) {
  const { cart, clearCart, setIsCartOpen } = useApp();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      street: '',
      house: '',
      address: '',
      pincode: '',
      landmark: '',
    },
  });

  async function onSubmit(data: CheckoutFormValues) {
    setIsSubmitting(true);
    
    const fullAddress = `${data.house}, ${data.street}, ${data.address ? data.address + ', ' : ''}${data.landmark ? 'near ' + data.landmark : ''}`.trim();
    const cartSummary = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');

    try {
      await sendOrderToSheet({
        orderDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        customerName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contactNumber: data.contactNumber,
        address: fullAddress,
        pincode: data.pincode,
        items: cartSummary,
        totalAmount: subtotal,
      });

      toast({
        title: 'Order Placed!',
        description: "We've received your order. You'll pay on delivery.",
      });
      clearCart();
      setIsCartOpen(false);

    } catch (error) {
      console.error('Failed to send order to sheet:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Could not place your order. Please try again later.',
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 mb-4 -ml-2 pr-6 flex-shrink-0">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <h3 className="text-xl font-semibold font-headline">Shipping Details</h3>
      </div>

      <ScrollArea className="flex-grow -mr-6 pr-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="checkout-form" className="space-y-6 pb-4">
            <div className="space-y-2">
                <h4 className="font-medium">Contact Information</h4>
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
                    name="contactNumber"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                            <Input placeholder="+91 12345 67890" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
              <div className="space-y-2">
                <h4 className="font-medium">Shipping Address</h4>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Street Name / Number</FormLabel>
                        <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                  <FormField
                    control={form.control}
                    name="house"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>House Name / Number</FormLabel>
                        <FormControl>
                            <Input placeholder="Apartment, suite, etc." {...field} />
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
                        <FormLabel>Address (Optional)</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="E.g. near the post office, 2nd floor"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                                <Input placeholder="123456" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="landmark"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Landmark (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Near the park" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
          </form>
        </Form>
      </ScrollArea>

      <div className="mt-auto pt-4 space-y-4 pr-6 flex-shrink-0">
        <Separator />
        <div className="flex justify-between items-center font-bold text-lg">
            <span>Total</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
          <p className="text-sm text-muted-foreground">Payment Method: Cash on Delivery</p>
        <Button onClick={form.handleSubmit(onSubmit)} form="checkout-form" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
}
