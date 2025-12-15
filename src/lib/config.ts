import type { Product, SiteProduct } from '@/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImageUrl = (id: string, hint?: string): string => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (image) {
    return image.imageUrl;
  }
  if (hint) {
    const fallback = PlaceHolderImages.find(img => img.imageHint.includes(hint));
    return fallback?.imageUrl || 'https://picsum.photos/seed/fallback/800/600';
  }
  return 'https://picsum.photos/seed/fallback/800/600';
}

export const products: Product[] = [
  {
    id: 'prod_01',
    name: 'Dynamic Clean',
    subtitle: 'Advanced Hygiene Formula',
    description: 'A cutting-edge solution that eradicates 99.9% of bacteria, leaving your floors with a pristine, streak-free shine that lasts.',
    themeColor: '#a6d500',
    mode: 'dark',
    animatedWebpUrl: "https://lrcqwbnytcceesofhdot.supabase.co/storage/v1/object/public/asset/hero/Sequence01-ezgif.com-video-to-webp-converter%20(1).webp",
    productImageUrl: getImageUrl('product-image-1', 'kitchen'),
  },
];

export const siteProducts: SiteProduct[] = [
  {
    id: 'prod_toilet_cleaner',
    slug: 'toilet-cleaner-5l',
    name: 'Toilet Cleaner (5L)',
    description:
      'Powerful formula that removes tough stains and kills 99.9% of germs, leaving your toilet sparkling clean and fresh.',
    imageUrls: [
        'https://picsum.photos/seed/toilet1/800/600',
        'https://picsum.photos/seed/toilet2/800/600',
        'https://picsum.photos/seed/toilet3/800/600',
    ],
    imageHint: 'toilet cleaner',
    price: 833,
    features: ["Targets and dissolves grime buildup under the rim and in the bowl.", "Formulated to cling to surfaces for longer contact and better cleaning.", "Leaves a refreshing and clean fragrance that deodorizes the entire space.", "Generous 5-liter container offers excellent value for long-term use.", "Helps prevent future stains from forming with regular application."],
  },
  {
    id: 'prod_floor_cleaner',
    slug: 'floor-cleaner-5l',
    name: 'Floor Cleaner (5L)',
    description:
      'Our floor cleaner cuts through grease and grime, leaving your floors spotless and with a brilliant shine. Safe for all floor types.',
    imageUrls: [
        'https://picsum.photos/seed/floor1/800/600',
        'https://picsum.photos/seed/floor2/800/600',
        'https://picsum.photos/seed/floor3/800/600',
    ],
    imageHint: 'floor cleaner',
    price: 599,
    features: ["Effortlessly lifts dirt and tracked-in grime from various hard surfaces.", "Dries quickly without leaving streaks, watermarks, or sticky residue.", "Versatile composition is suitable for tile, laminate, vinyl, and sealed wood.", "A little goes a long way, making it an economical choice for daily cleaning.", "Infuses your home with a subtle, clean scent that enhances the ambiance."],
  },
  {
    id: 'prod_dishwasher',
    slug: 'dishwasher-liquid-5l',
    name: 'Dishwasher Liquid (5L)',
    description:
      'Advanced cleaning for your dishwasher, removing limescale and buildup to ensure your dishes come out sparkling clean every time.',
    imageUrls: [
        'https://picsum.photos/seed/dish1/800/600',
        'https://picsum.photos/seed/dish2/800/600',
        'https://picsum.photos/seed/dish3/800/600',
    ],
    imageHint: 'dishwasher tablets',
    price: 619,
    features: ["Actively works to break down mineral deposits and limescale from pipes.", "Helps maintain your dishwasher's performance and extend its lifespan.", "Ensures every dish, glass, and piece of silverware emerges spotless.", "Large container provides a convenient and lasting supply for your kitchen.", "Neutralizes odors within the machine, leaving it smelling fresh and clean."],
  },
];


export const siteConfig = {
  brandName: 'Dr. Drift',
  navLinks: [
    { name: 'Product', href: '#product' },
    { name: 'Our Products', href: '#our-products' },
    { name: 'Ingredients', href: '#ingredients' },
    { name: 'Safety', href: '#safety' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ],
  socials: {
    twitter: 'https://twitter.com',
    instagram: 'https://www.instagram.com/drdrift.co/',
  },
  footerLinks: {
    company: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '#contact' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ]
  }
};
