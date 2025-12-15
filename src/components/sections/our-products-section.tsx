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
import { Sparkles, CircleSlashed, SprayCan } from 'lucide-react';
import Image from 'next/image';
import { useApp } from '@/hooks/use-app';

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
  },
];

const ProductCard = ({ product }: { product: (typeof ourProducts)[0] }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useApp();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    }, quantity);
  };

  return (
    <Card className="text-left shadow-lg hover:shadow-primary/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
        data-ai-hint={product.imageHint}
      />
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
            <product.icon className="w-6 h-6" />
          </div>
          <CardTitle className="font-headline">{product.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4 bg-secondary/50 p-4">
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
    </Card>
  );
};


const OurProductsSection = () => {
  return (
    <section id="our-products" className="bg-background pt-0 md:pt-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">
          Our Products
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
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
