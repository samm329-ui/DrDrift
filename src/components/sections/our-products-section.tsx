'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Wrench, WashingMachine, SprayCan, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ourProducts = [
  {
    icon: SprayCan,
    name: 'Toilet Cleaner',
    description:
      'Powerful formula that removes tough stains and kills 99.9% of germs, leaving your toilet sparkling clean and fresh.',
    imageUrl: 'https://picsum.photos/seed/toilet/600/400',
    imageHint: 'toilet cleaner',
    details: [
      'Kills 99.9% of bacteria and viruses',
      'Removes tough limescale and rust stains',
      'Thick gel formula coats the bowl',
      'Leaves a fresh, long-lasting scent',
    ],
  },
  {
    icon: Wrench,
    name: 'Floor Cleaners',
    description:
      'Our floor cleaner cuts through grease and grime, leaving your floors spotless and with a brilliant shine. Safe for all floor types.',
    imageUrl: 'https://picsum.photos/seed/floor/600/400',
    imageHint: 'floor cleaner',
    details: [
      'pH-neutral and safe for all sealed floors',
      'Streak-free and residue-free formula',
      'Concentrated, a little goes a long way',
      'Biodegradable and eco-friendly',
    ],
  },
  {
    icon: WashingMachine,
    name: 'Dishwasher',
    description:
      'Advanced cleaning for your dishwasher, removing limescale and buildup to ensure your dishes come out sparkling clean every time.',
    imageUrl: 'https://picsum.photos/seed/dishwasher/600/400',
    imageHint: 'dishwasher tablets',
    details: [
      'Powerful grease-cutting action',
      'Prevents hard water spots and film',
      'Cleans and freshens the dishwasher interior',
      'Phosphate-free and septic-safe',
    ],
  },
];

const OurProductsSection = () => {
  const [openPopover, setOpenPopover] = useState<string | null>(null);

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
          {ourProducts.map((item, index) => (
            <Popover
              key={index}
              open={openPopover === item.name}
              onOpenChange={(isOpen) => setOpenPopover(isOpen ? item.name : null)}
            >
              <PopoverTrigger asChild>
                <div
                  onMouseEnter={() => setOpenPopover(item.name)}
                  onMouseLeave={() => setOpenPopover(null)}
                >
                  <Card className="text-left shadow-lg hover:shadow-primary/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      data-ai-hint={item.imageHint}
                    />
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="font-headline">{item.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="center"
                className="w-80 bg-background border-primary"
                onMouseEnter={() => setOpenPopover(item.name)}
                onMouseLeave={() => setOpenPopover(null)}
              >
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none text-primary">
                      {item.name} Features
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Key benefits of using our product.
                    </p>
                  </div>
                  <ul className="grid gap-2">
                    {item.details.map((detail, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProductsSection;
