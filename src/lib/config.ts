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
    name: 'AURA FLOOR',
    subtitle: 'Advanced Hygiene Formula',
    description: 'A cutting-edge solution that eradicates 99.9% of bacteria, leaving your floors with a pristine, streak-free shine that lasts.',
    themeColor: '#2AA8FF',
    mode: 'dark',
    animatedWebpUrl: "https://lrcqwbnytcceesofhdot.supabase.co/storage/v1/object/public/asset/hero/Sequence01-ezgif.com-video-to-webp-converter%20(1).webp",
    productImageUrl: getImageUrl('product-image-1', 'kitchen'),
  },
  {
    id: 'prod_02',
    name: 'GLAZE GUARD',
    subtitle: 'Crystal Clear Surface Protectant',
    description: 'Our revolutionary formula creates an invisible shield on glass surfaces, repelling water, dirt, and grime for unparalleled clarity.',
    themeColor: '#39E59C',
    mode: 'light',
    animatedWebpUrl: "https://assets.mixkit.co/videos/preview/mixkit-soap-bubbles-in-the-air-1170-large.mp4",
    productImageUrl: getImageUrl('product-image-3', 'window'),
  },
  {
    id: 'prod_03',
    name: 'TERRA-ZYME',
    subtitle: 'Bio-Enzymatic Bathroom Cleaner',
    description: 'Harnessing the power of natural enzymes, Terra-Zyme dissolves soap scum and buildup, restoring your bathroom surfaces to their natural brilliance.',
    themeColor: '#A962FF',
    mode: 'inherit',
    animatedWebpUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-colorful-gradient-that-swirls-in-a-circle-32778-large.mp4",
    productImageUrl: getImageUrl('product-image-2', 'bathroom'),
  },
];

export const siteConfig = {
  brandName: 'Dr. Drift',
  navLinks: [
    { name: 'Product', href: '#product' },
    { name: 'Ingredients', href: '#ingredients' },
    { name: 'Safety', href: '#safety' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ],
  socials: {
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
  footerLinks: [
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ]
};
