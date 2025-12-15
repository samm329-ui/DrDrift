'use client';

import { useState } from 'react';
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
import { SprayCan, Sparkles, CircleSlashed, Info } from 'lucide-react';
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
    imageUrl: 'https://picsum.photos/seed/toilet/600/400',
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
    imageUrl: 'https://picsum.photos/seed/floor/600/400',
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
    imageUrl: 'https://picsum.photos/seed/dishwasher/600/400',
    imageHint: 'dishwasher tablets',
    price: 619,
    features: ["Removes limescale", "Prevents buildup", "Sparkling clean dishes", "5L economy size"],
  },
];

const ProductCard = ({ product }: { product: (typeof ourProducts)[0] }) => {
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useApp();
  const isMobile = useIsMobile();


  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    };
    addToCart(item, quantity);
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
      <Card className="text-left shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col group bg-background/80 backdrop-blur-sm border-white/20">
        <PopoverTrigger asChild onClick={(e) => { if (isMobile) e.preventDefault(); setIsOpen(!isOpen)}}>
            <div className="relative">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={product.imageHint}
                />
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
              <CardTitle className="font-headline text-lg">{product.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-4 bg-secondary/50 p-4 mt-auto">
            <div className="flex items-center gap-2">
              <label htmlFor={`quantity-${product.id}`} className="text-xs font-medium">
                Qty:
              </label>
              <Select
                value={String(quantity)}
                onValueChange={(val) => setQuantity(Number(val))}
              >
                <SelectTrigger id={`quantity-${product.id}`} className="w-16 h-9">
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
            <Button onClick={handleAddToCart} size="sm">Add to Cart</Button>
          </CardFooter>
        </div>
      </Card>
    </Popover>
  );
};


const OurProductsSection = () => {
  return (
    <section id="our-products" className="bg-background pt-0 md:pt-0 py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">
          Our Products
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          A range of products to keep your home shining.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {ourProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProductsSection;
