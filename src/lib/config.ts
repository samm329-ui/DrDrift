
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
    mode: 'light',
    animatedWebpUrl: getImageUrl('animated-hero-1'),
    productImageUrl: getImageUrl('product-image-1', 'kitchen'),
  },
];

export const siteProducts: SiteProduct[] = [
  {
    id: 'prod_toilet_cleaner',
    slug: 'toilet-cleaner-5l',
    name: 'Toilet Cleaner (5L)',
    description:
      'A robust formula engineered to tackle the most stubborn stains and eliminate germs, ensuring your toilet bowl remains immaculately clean, sanitized, and odor-free day after day.',
    imageUrls: [
        getImageUrl('toilet-cleaner-1'),
        getImageUrl('toilet-cleaner-2'),
        getImageUrl('toilet-cleaner-3'),
    ],
    imageHint: 'toilet cleaner',
    price: 833,
    features: [
      'Engineered with a potent formula that targets and dissolves persistent grime, hard water rings, and unsightly mineral buildup that accumulates under the rim and deep within the bowl.',
      'Formulated with a unique thick-gel consistency that clings tenaciously to vertical surfaces, allowing for extended contact time and maximizing the cleaning action for a truly deep clean.',
      'Infused with a carefully selected, refreshing fragrance that not only masks but actively neutralizes unpleasant odors, leaving your entire bathroom space smelling crisp and hygienically clean.',
      'Packaged in a generous 5-liter container, this product offers exceptional value and a long-lasting supply, reducing the frequency of purchases for both homes and businesses.',
      'With consistent use, it creates a protective barrier on the porcelain surface that actively repels future stains, making subsequent cleanings quicker and easier.',
    ],
  },
  {
    id: 'prod_floor_cleaner',
    slug: 'floor-cleaner-5l',
    name: 'Floor Cleaner (5L)',
    description:
      'Our advanced floor cleaner effortlessly cuts through stubborn grease and daily grime, leaving your floors not just clean, but with a brilliant, streak-free shine. Perfectly safe for all types of hard flooring.',
    imageUrls: [
        getImageUrl('floor-cleaner-1'),
        getImageUrl('floor-cleaner-2'),
        getImageUrl('floor-cleaner-3'),
    ],
    imageHint: 'floor cleaner',
    price: 599,
    features: [
      'Powerfully lifts and suspends embedded dirt, spills, and tracked-in grime from a multitude of hard surfaces without the need for aggressive scrubbing, restoring the floor’s natural look.',
      'Specially formulated to evaporate quickly and evenly, ensuring a flawless, streak-free finish every time. It leaves behind no watermarks, haze, or sticky residue that can attract more dirt.',
      'Its versatile, pH-balanced composition is gentle yet effective, making it the ideal cleaning solution for a wide range of flooring including tile, laminate, vinyl, and sealed hardwood.',
      'The concentrated nature of the formula means a small amount goes a very long way, providing an economical and resource-efficient choice for both daily maintenance and deep cleaning tasks.',
      'Delicately infuses your living or work space with a subtle, clean, and uplifting aroma that enhances the overall ambiance without being overpowering or smelling of harsh chemicals.',
    ],
  },
  {
    id: 'prod_dishwasher',
    slug: 'dishwasher-liquid-5l',
    name: 'Dishwasher Liquid (5L)',
    description:
      'Experience next-level cleaning for your dishwasher. This liquid powerhouse actively removes limescale and hidden buildup, ensuring your dishes emerge sparkling and spotless after every single wash.',
    imageUrls: [
        getImageUrl('dishwasher-liquid-1'),
        getImageUrl('dishwasher-liquid-2'),
        getImageUrl('dishwasher-liquid-3'),
    ],
    imageHint: 'dishwasher tablets',
    price: 619,
    features: [
      'Proactively works to break down and flush away stubborn mineral deposits and unsightly limescale that build up in your machine’s pipes, jets, and filters, which can impede water flow.',
      'Regular use helps maintain your dishwasher’s peak cleaning performance and operational efficiency, safeguarding its internal components and potentially extending its functional lifespan.',
      'Guarantees that every dish, glass, and piece of silverware emerges from the wash cycle completely spotless, brilliantly clear, and free from the cloudy film that hard water can leave behind.',
      'The large, easy-to-pour container provides a convenient, cost-effective, and lasting supply for your kitchen, ensuring you are always ready to run a cleaning cycle when needed.',
      'Effectively neutralizes and eliminates trapped food odors from within the machine’s interior, leaving it smelling noticeably fresh, clean, and ready for the next load of dishes.',
    ],
  },
];


export const siteConfig = {
  brandName: 'Dr. Drift',
  products: siteProducts,
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
