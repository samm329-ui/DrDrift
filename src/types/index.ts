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

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  rect?: DOMRect;
};
