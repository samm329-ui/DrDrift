'use client';

import React, { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { SprayCan, Sparkles, CircleSlashed, Info, Zap, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useApp } from '@/hooks/use-app';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const ourProducts = [
  {
    id: 'prod_toilet_cleaner',
    icon: SprayCan,
    name: 'Toilet Cleaner (5L)',
    description:
      'Powerful formula that removes tough stains and kills 99.9% of germs, leaving your toilet sparkling clean and fresh.',
    imageUrls: [
        'https://picsum.photos/seed/toilet1/600/400',
        'https://picsum.photos/seed/toilet2/600/400',
        'https://picsum.photos/seed/toilet3/600/400',
    ],
    imageHint: 'toilet cleaner',
    price: 833,
    features: ["Kills 99.9% of germs", "Removes tough stains", "Fresh scent", "5L value pack"],
  },
  {
    id: 'prod_floor_cleaner',
    icon: Sparkles,
    name: 'Floor Cleaner (5L)',
    description:
      'Our floor cleaner cuts through grease and grime, leaving your floors spotless and with a brilliant shine. Safe for all floor types.',
    imageUrls: [
        'https://picsum.photos/seed/floor1/600/400',
        'https://picsum.photos/seed/floor2/600/400',
        'https://picsum.photos/seed/floor3/600/400',
    ],
    imageHint: 'floor cleaner',
    price: 599,
    features: ["Cuts through grease", "Brilliant shine", "Safe for all floors", "Concentrated formula"],
  },
  {
    id: 'prod_dishwasher',
    icon: CircleSlashed,
    name: 'Dishwasher Liquid (5L)',
    description:
      'Advanced cleaning for your dishwasher, removing limescale and buildup to ensure your dishes come out sparkling clean every time.',
    imageUrls: [
        'https://picsum.photos/seed/dish1/600/400',
        'https://picsum.photos/seed/dish2/600/400',
        'https://picsum.photos/seed/dish3/600/400',
    ],
    imageHint: 'dishwasher tablets',
    price: 619,
    features: ["Removes limescale", "Prevents buildup", "Sparkling clean dishes", "5L economy size"],
  },
];

const ProductCard = ({ product }: { product: (typeof ourProducts)[0] }) => {
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart, buyNow } = useApp();
  const isMobile = useIsMobile();
  const autoplayPlugin = useRef(Autoplay({ delay: 2000 + Math.random() * 1000, stopOnInteraction: true }));
  
  // Create a fake original price for display purposes
  const originalPrice = Math.round(product.price * 1.25);


  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrls[0],
    };
    addToCart(item, quantity);
  };
  
  const handleBuyNow = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrls[0],
    };
    buyNow(item, quantity);
  };

  const trigger = (
    <div className="absolute top-2 right-2 z-10">
        <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background/80">
            <Info className="h-4 w-4" />
        </Button>
    </div>
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Card className="text-left shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col group bg-background dark:bg-background/80 backdrop-blur-sm border-white/20">
        <PopoverTrigger asChild onClick={(e) => { if (isMobile) e.preventDefault(); setIsOpen(!isOpen)}}>
            <div className="relative">
                <Carousel
                  plugins={[autoplayPlugin.current]}
                  className="w-full"
                  onMouseEnter={autoplayPlugin.current.stop}
                  onMouseLeave={autoplayPlugin.current.play}
                >
                  <CarouselContent>
                    {product.imageUrls.map((url, index) => (
                      <CarouselItem key={index}>
                        <Image
                            src={url}
                            alt={`${product.name} image ${index + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover"
                            data-ai-hint={product.imageHint}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Carousel>
                {!isMobile && trigger}
            </div>
        </PopoverTrigger>
         {isMobile && (
            <div className="absolute top-2 right-2 z-10" onClick={() => setIsOpen(true)}>
                {trigger}
            </div>
        )}
        <PopoverContent 
            side="top" 
            align="center" 
            className="w-80 bg-background/90 backdrop-blur-sm"
            onMouseEnter={() => !isMobile && setIsOpen(true)}
            onMouseLeave={() => !isMobile && setIsOpen(false)}
        >
            <div className="space-y-2">
                <h4 className="font-semibold leading-none">{product.name} Features</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {product.features.map(feature => <li key={feature}>{feature}</li>)}
                </ul>
            </div>
        </PopoverContent>

        <div 
          className="flex flex-col flex-grow"
          onMouseEnter={() => !isMobile && setIsOpen(true)}
          onMouseLeave={() => !isMobile && setIsOpen(false)}
        >
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0">
                <product.icon className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="font-headline text-lg">{product.name}</CardTitle>
                 <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-bold text-lg text-primary">Rs. {product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">Rs. {originalPrice}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-3 bg-secondary/50 p-3 mt-auto">
             <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <label htmlFor={`quantity-${product.id}`} className="text-xs font-medium">
                    Qty:
                    </label>
                    <Select
                    value={String(quantity)}
                    onValueChange={(val) => setQuantity(Number(val))}
                    >
                    <SelectTrigger id={`quantity-${product.id}`} className="w-[60px] h-9">
                        <SelectValue placeholder="Qty" />
                    </SelectTrigger>
                    <SelectContent>
                        {[...Array(8).keys()].map((i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                            {i + 1}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={handleAddToCart} size="sm" variant="outline">
                        <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleBuyNow} size="sm" className="flex-grow">
                        <Zap className="mr-2 h-4 w-4" />
                        Buy Now
                    </Button>
                </div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Popover>
  );
};


const OurProductsSection = () => {
  return (
    <section id="our-products" className="bg-background-alt py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">
          Our Products
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          A range of products to keep your home shining.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ourProducts.map((item, index) => (
                <ProductCard key={index} product={item} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default OurProductsSection;
