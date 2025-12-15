import type { Product } from '@/types';
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
  footerLinks: [
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ]
};
