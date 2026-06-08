export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  category: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  specs: Record<string, string>;
  isRecommended?: boolean;
  isDeal?: boolean;
  isTrending?: boolean;
  isLifestyle?: boolean;
  isSustainable?: boolean;
  searchContext?: string; // Metadata for Rufus AI assistant grounding
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'rufus';
  text: string;
  timestamp: Date;
  suggestedProducts?: string[]; // IDs of products to showcase
}

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderDate: string;
  deliveryDate: string;
  status: 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  items: OrderItem[];
  trackingSteps: { status: string; time: string; completed: boolean }[];
  currentLocation: { lat: number; lng: number };
}

export interface AppState {
  cart: CartItem[];
  orders: Order[];
  currentChat: ChatMessage[];
  selectedProduct: Product | null;
  activeTab: string; // 'home' | 'stuff' | 'orders' etc
  deliveryLocation: string;
}
