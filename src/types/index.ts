export type Product = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  mode: 'dark' | 'light' | 'inherit';
  animatedWebpUrl: string;
  productImageUrl: string;
};
