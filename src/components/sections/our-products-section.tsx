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
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    }, quantity);
  };
  
  const trigger = (
    <div className="absolute top-3 right-3 z-10">
        <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background/80">
            <Info className="h-4 w-4 text-foreground/80" />
        </Button>
    </div>
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Card className="text-left shadow-lg hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col group rounded-2xl">
        <PopoverTrigger asChild onClick={(e) => { if (isMobile) e.preventDefault(); setIsOpen(!isOpen)}}>
            <div className="relative">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover"
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
            className="w-80 bg-background/90 backdrop-blur-sm rounded-xl"
            onMouseEnter={() => !isMobile && setIsOpen(true)}
            onMouseLeave={() => !isMobile && setIsOpen(false)}
        >
            <div className="space-y-2">
                <h4 className="font-semibold leading-none">{product.name} Features</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
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
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <product.icon className="w-6 h-6" />
              </div>
              <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">{product.description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-4 bg-secondary/50 p-4 mt-auto">
            <div className="flex items-center gap-2">
              <label htmlFor={`quantity-${product.id}`} className="text-sm font-medium">
                Qty:
              </label>
              <Select
                value={String(quantity)}
                onValueChange={(val) => setQuantity(Number(val))}
              >
                <SelectTrigger id={`quantity-${product.id}`} className="w-20">
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
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </CardFooter>
        </div>
      </Card>
    </Popover>
  );
};


const OurProductsSection = () => {
  return (
    <section id="our-products" className="bg-background pt-0 md:pt-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
          Our Products
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          A range of products to keep your home shining, built with integrity and performance in mind.
        </p>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {ourProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProductsSection;
