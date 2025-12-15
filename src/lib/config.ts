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
    { name: 'Product', href: '#product', preview: 'https://picsum.photos/seed/product-preview/400/200' },
    { name: 'Our Products', href: '#our-products', preview: 'https://picsum.photos/seed/our-products-preview/400/200' },
    { name: 'Ingredients', href: '#ingredients', preview: 'https://picsum.photos/seed/ingredients-preview/400/200' },
    { name: 'Safety', href: '#safety', preview: 'https://picsum.photos/seed/safety-preview/400/200' },
    { name: 'Reviews', href: '#reviews', preview: 'https://picsum.photos/seed/reviews-preview/400/200' },
    { name: 'FAQ', href: '#faq', preview: 'https://picsum.photos/seed/faq-preview/400/200' },
    { name: 'Contact', href: '#contact', preview: 'https://picsum.photos/seed/contact-preview/400/200' },
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
