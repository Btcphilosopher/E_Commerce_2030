import React, { useState } from 'react';
import { 
  Sparkles, Star, Plus, Minus, Search, ShoppingBag, 
  MapPin, Clock, Trash2, ArrowRight, Sun, Calendar, 
  Bot, ChevronRight, Play, Info, Eye, LogOut, Check,
  Leaf, Layers, HeartPulse, Tv, Flame, Truck, RefreshCw, ShieldCheck
} from 'lucide-react';

import { MOCK_PRODUCTS, MOCK_ORDERS, SCHEDULED_ACTIVITIES, DEEPLINK_NARRATIVE } from './constants';
import { Product, CartItem, ChatMessage, Order, AppState } from './types';

// Importing Custom Subcomponent modules
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RufusAssistant from './components/RufusAssistant';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import ExpanseModal from './components/ExpanseModal';
import OrdersWidget from './components/OrdersWidget';

export default function App() {
  // Pre-populate application states with mock variables for a rich out-of-box experience
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'keep-logitech') || MOCK_PRODUCTS[0],
      quantity: 1
    }
  ]);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [rufusIsOpen, setRufusIsOpen] = useState<boolean>(false);
  const [rufusIsUnread, setRufusIsUnread] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);
  const [expanseIsOpen, setExpanseIsOpen] = useState<boolean>(false);
  const [rufusInputDirect, setRufusInputDirect] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-rufus',
      sender: 'rufus',
      text: "Salutations Alex! I am Rufus, your holographic AI assistant for Amazon in the year 2030.\n\nI've analyzed your biometric wellness profiles from your Sero ring and cross-referenced recent sub-space orders. I can assist with:\n- Specifications mapping of quantum products\n- Live drone delivery logistics queries over Seattle\n- Instigating rapid sub-orbital checkouts\n\nHow may I facilitate your shopping experience today?",
      timestamp: new Date()
    }
  ]);

  // Cart logic triggers
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Visual indicator triggers cart slide
    setCartIsOpen(true);
  };

  const handleRemoveCartItem = (prodId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== prodId));
  };

  const handleModifyQty = (prodId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === prodId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCompleteCheckout = (newOrder: Order) => {
    setOrders(prev => [...prev, newOrder]);
    setCart([]); // Flush cart
    
    // Auto launch automated dialogue about drone courier tracking
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `automatic-drone-${Date.now()}`,
        sender: 'rufus',
        text: `Holographic update: Ground transit system for Order ${newOrder.id} finalized.\n\nAutonomous drone flight Argo-4 has dispatched from our local Seattle regional hub! It is loaded with your cargo and coordinates have synced with your balcony safety port. Expected flight time: 1:30 PM. Use the **Orders** tracker to view transit live!`,
        timestamp: new Date()
      }]);
      setRufusIsUnread(true);
    }, 2000);
  };

  // Quick Launcher inside Good Morning Alex panel
  const handleQuickRufusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rufusInputDirect.trim()) return;

    // Append user query and open Rufus Drawer
    const userQuery = rufusInputDirect;
    setRufusInputDirect('');
    setRufusIsOpen(true);
    setRufusIsUnread(false);

    // Kicks off prompt
    setTimeout(() => {
      // simulate key press send
      const triggerButton = document.querySelector('#rufus-assistant-panel form button[type="submit"]') as HTMLButtonElement;
      if (triggerButton) {
        const inputField = document.querySelector('#rufus-assistant-panel form input') as HTMLInputElement;
        if (inputField) {
          inputField.value = userQuery;
          // dispatch change
          const ev = new Event('input', { bubbles: true });
          inputField.dispatchEvent(ev);
          triggerButton.click();
        }
      }
    }, 400);
  };

  const recommendedProducts = MOCK_PRODUCTS.filter(p => p.isRecommended);
  const aiPickProducts = MOCK_PRODUCTS.filter(p => p.isLifestyle || p.isSustainable || p.isTrending);
  const todayDeals = MOCK_PRODUCTS.filter(p => p.isDeal);
  const keepShoppingProducts = MOCK_PRODUCTS.filter(p => p.id.startsWith('keep-'));

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div id="amazon-app-viewport" className="min-h-screen bg-[#070b13] flex flex-row overflow-hidden relative selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* 1. Global Left Sidebar Menu wrapper */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenRufus={() => {
          setRufusIsOpen(true);
          setRufusIsUnread(false);
        }}
        rufusIsUnread={rufusIsUnread}
      />

      {/* 2. Main content area containing Header and body scroll grids */}
      <div id="main-content-scroll" className="flex-1 flex flex-col h-screen overflow-y-auto no-scrollbar">
        
        {/* Header bar */}
        <Header 
          cartCount={totalCartCount} 
          onOpenCart={() => setCartIsOpen(true)}
          onOpenRufus={() => {
            setRufusIsOpen(true);
            setRufusIsUnread(false);
          }}
          onSelectProduct={setSelectedProduct}
          products={MOCK_PRODUCTS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tab Route Switching */}
        {activeTab === 'home' ? (
          <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full">
            
            {/* HERO WELCOME & WIDGET WRAPPER SECTION (Matched exactly to mockup) */}
            <div 
              id="hero-banner-section" 
              className="relative rounded-none overflow-hidden min-h-[500px] border border-white/5 flex flex-col lg:flex-row gap-6 p-6 lg:p-8"
              style={{
                background: 'linear-gradient(135deg, #121212 0%, #0d0d0d 100%)'
              }}
            >
              {/* Decorative Corner Accents from Sophisticated Dark design */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#c1a35f]" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#c1a35f]" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#c1a35f]" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#c1a35f]" />

              {/* Virtual Cozy Living Room Interior panoramic visual background */}
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25 select-none pointer-events-none"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200")'
                }}
              />
              {/* Star twilight skylights overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a] via-transparent to-[#c1a35f]/5 select-none pointer-events-none" />

              {/* Left Column: Slogan Welcome Header */}
              <div id="hero-left-col" className="flex-1 flex flex-col justify-center text-left z-10 relative pl-4">
                <span className="text-[#c1a35f] text-xs font-mono font-bold tracking-[0.25em] uppercase mb-1">Aurelian Curator Studio</span>
                <p className="text-zinc-400 text-xs font-semibold tracking-wider uppercase leading-none mt-2">Welcome to</p>
                <h1 className="text-5xl lg:text-[5.5rem] font-serif font-light tracking-tight text-[#f5f2ed] mt-2 leading-[1.1]">
                  Amazon <br />
                  <span className="italic text-[#c1a35f] relative">
                    Curated
                    <span className="absolute left-0 bottom-1 w-full h-[1px] bg-[#c1a35f]/40" />
                  </span> <br />
                  2030
                </h1>
                
                <p className="text-zinc-400 text-xs md:text-sm font-light font-sans mt-6 max-w-[340px] leading-relaxed">
                  Where predictive smart innovation meets architectural elegance. Experience sub-minute sub-orbital courier deliveries and automated personal styling.
                </p>

                <div className="mt-8 flex gap-3.5">
                  <button 
                    onClick={() => setActiveTab('more')}
                    className="px-6 py-3 bg-[#c1a35f] text-black hover:bg-[#d9bf86] hover:scale-105 active:scale-95 transition-all text-xs tracking-widest uppercase font-bold rounded-none flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#c1a35f]/10"
                  >
                    <span>Explore Archive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Overlay Widget Card "Good morning Alex" exactly styled from the picture */}
              <div id="hero-right-col" className="w-full lg:w-[460px] rounded-none bg-[#111] backdrop-blur-md border border-white/5 p-6 flex flex-col gap-5 self-center z-10 relative">
                
                {/* Gold corner elements on widget container */}
                <div className="absolute -top-[1.5px] -left-[1.5px] w-3 h-3 border-t border-l border-[#c1a35f]" />
                <div className="absolute -bottom-[1.5px] -right-[1.5px] w-3 h-3 border-b border-r border-[#c1a35f]" />

                {/* Header widget widget bar */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-[#c1a35f]" />
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-white font-display">Good morning, Alex</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-zinc-400 font-mono">
                    <span>Seattle, WA • 72°</span>
                  </div>
                </div>

                {/* Recommended scroll listing */}
                <div>
                  <p className="text-[9px] uppercase font-mono tracking-widest font-bold text-[#c1a35f] text-left mb-2">Recommended for you</p>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                    {recommendedProducts.map((prod) => (
                      <ProductCard 
                        key={prod.id} 
                        product={prod} 
                        variant="recommended" 
                        onSelect={() => setSelectedProduct(prod)}
                        onAddToCart={(e) => {
                          e.stopPropagation();
                          handleAddToCart(prod);
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Your Day at a Glance scheduler slots */}
                <div>
                  <p className="text-[9px] uppercase font-mono tracking-widest font-bold text-[#c1a35f] text-left mb-2">Your day at a glance</p>
                  <div className="space-y-1.5 text-left text-xs">
                    {SCHEDULED_ACTIVITIES.map((act) => (
                      <div 
                        key={act.id} 
                        className="p-2.5 rounded-none bg-[#161616] border border-white/5 flex items-center justify-between text-zinc-300 hover:border-[#c1a35f]/45 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className={`w-1.5 h-1.5 rounded-full ${act.type === 'delivery' ? 'bg-[#c1a35f]' : act.type === 'work' ? 'bg-zinc-400' : 'bg-[#c1a35f]/60'}`} />
                          <span className="font-bold truncate text-white uppercase tracking-wider text-[10px]">{act.title}</span>
                          <span className="text-[9px] text-zinc-500 font-sans truncate hidden sm:inline">{act.desc}</span>
                        </div>
                        <div className="font-mono text-[9px] font-bold text-zinc-400 bg-white/5 px-2 py-0.5 rounded-none shrink-0">
                          {act.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ask Rufus inputs container */}
                <form onSubmit={handleQuickRufusSubmit} className="relative mt-1">
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      placeholder="Ask Rufus anything on curated collections..." 
                      value={rufusInputDirect}
                      onChange={(e) => setRufusInputDirect(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 text-[11px] rounded-none bg-[#161616] text-[#f5f2ed] placeholder-zinc-600 border border-white/10 focus:outline-none focus:border-[#c1a35f] transition-all font-sans"
                    />
                    <button 
                      type="submit"
                      disabled={!rufusInputDirect.trim()}
                      className="absolute right-1.5 p-1.5 bg-[#c1a35f]/10 text-[#c1a35f] hover:bg-[#c1a35f] hover:text-black hover:scale-105 active:scale-95 transition-all text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

              </div>
            </div>

            {/* WHITE OVERLAY PILL ROW OF INNOVATIVE FEATURES (Transformed to beautiful dark minimalist) */}
            <div 
              id="features-capsule-row" 
              className="rounded-none bg-[#111111] border border-white/5 p-5 flex flex-row flex-wrap justify-center lg:justify-between items-center gap-6 text-[#f5f2ed] relative"
            >
              {/* Gold borders decorative accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#c1a35f]" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#c1a35f]" />

              {[
                { label: 'Fast, free delivery', desc: 'Secure Flight Logistics', icon: Truck },
                { label: 'AI Shopping', desc: 'Cognitive curation', icon: Bot },
                { label: 'Sustainability', desc: 'Net-negative footprint', icon: Leaf },
                { label: 'Health & Wellness', desc: 'Biometric synergy', icon: HeartPulse },
                { label: 'Amazon Live', desc: 'Interactive broadcasts', icon: Tv },
                { label: 'Made in USA', desc: 'Local artisan archives', icon: ShieldCheck }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-center gap-3.5 text-left px-3 py-1 bg-transparent rounded-none shrink-0 border-0">
                    <div className="w-8 h-8 rounded-none bg-[#181818] border border-white/5 text-[#c1a35f] flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-white leading-none">{feat.label}</p>
                      <p className="text-[9px] text-[#c1a35f]/70 mt-1 leading-none font-medium uppercase font-mono">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DISCOVER MORE WITH AI (Bento-styled 5-grid selector) */}
            <section id="ai-picks-section">
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-display">Discover more with AI</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Continuous learning predictive selections based on bio-telemetry insights</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono font-bold animate-pulse">
                    ✦ RUFUS ACTIVE SELECTION
                  </span>
                  <button 
                    onClick={() => setActiveTab('more')}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors hover:underline cursor-pointer"
                  >
                    <span>See all</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Grid block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {aiPickProducts.slice(0, 5).map((prod) => (
                  <ProductCard 
                    key={prod.id} 
                    product={prod} 
                    variant="aiPick" 
                    onSelect={() => setSelectedProduct(prod)}
                    onAddToCart={(e) => {
                      e.stopPropagation();
                      handleAddToCart(prod);
                    }}
                  />
                ))}
              </div>
            </section>

            {/* TODAY'S DEALS GRID (4 Deal Items + 1 Promo block of Amazon Anywhere Drone Delivery) */}
            <section id="today-deals-section">
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <h2 className="text-sm font-extrabold text-white uppercase tracking-wider font-display">Today's deals</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Special limited-time reductions on high frequency sub-orbital inventory</p>
                </div>
                <button 
                  onClick={() => setActiveTab('lists')}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors hover:underline cursor-pointer"
                >
                  <span>See all</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {todayDeals.slice(0, 4).map((prod) => (
                  <ProductCard 
                    key={prod.id} 
                    product={prod} 
                    variant="deal" 
                    onSelect={() => setSelectedProduct(prod)}
                    onAddToCart={(e) => {
                      e.stopPropagation();
                      handleAddToCart(prod);
                    }}
                  />
                ))}

                {/* Interactive Promo Block: Amazon Anywhere */}
                <div 
                  id="amazon-anywhere-promo"
                  onClick={() => alert("Amazon Anywhere Drone mesh initialized in Seattle core district. Prepare beacon pads!")}
                  className="group relative h-full rounded-xl overflow-hidden cursor-pointer border border-[#ffe1a6]/20 bg-slate-950 p-4 text-left flex flex-col justify-between"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=400" 
                    alt="Drone courier delivery" 
                    className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040916] via-[#040916]/40 to-transparent pointer-events-none" />

                  <div className="relative">
                    <span className="text-[9px] text-[#ffa21e] font-bold font-mono uppercase tracking-widest bg-[#ffa21e]/15 px-2 py-0.5 rounded-full border border-[#ffa21e]/20">
                      Introducing
                    </span>
                    <h3 className="text-lg font-black text-white mt-2 leading-tight font-display pr-4">Amazon Anywhere</h3>
                    <p className="text-[11px] text-zinc-300 leading-relaxed font-sans mt-2">
                      Seamless shopping. Autonomous sub-orbital drone couriers fly parcels directly to your physical spatial coordinates.
                    </p>
                  </div>
                  
                  <div className="relative pt-6">
                    <button className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-[#070b13] hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all text-[10px] font-bold font-display uppercase flex items-center gap-1.5 shadow-sm shadow-amber-500/10 cursor-pointer">
                      <span>Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* DETAILED BENTO DOUBLE ROW BELOW DEALS */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
              
              {/* Column 1: Prime Video (4 grid columns span) */}
              <div 
                id="prime-video-bento"
                className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/5 bg-[#0a0f1d] relative min-h-[300px] flex flex-col justify-between"
              >
                {/* Background Poster view */}
                <img 
                  src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=400" 
                  alt="Space stars void" 
                  className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02050b] via-[#02050b]/40 to-transparent" />

                <div className="p-4 z-10 text-left">
                  <span className="text-[9px] text-amber-400 font-bold font-mono tracking-widest bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase">
                    Prime Video
                  </span>
                  <p className="text-[10px] text-zinc-400 mt-2">Watch now</p>
                  <h4 className="text-xl font-black text-white font-display mt-0.5 leading-none">THE EXPANSE</h4>
                  <p className="text-[9px] text-sky-400 font-mono tracking-widest mt-1">THE COLD VOID SE-3</p>
                </div>

                <div className="p-4 z-10 flex items-center justify-between gap-4">
                  <button 
                    onClick={() => setExpanseIsOpen(true)}
                    className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-[#070b13] flex items-center justify-center shadow-md active:scale-90 hover:scale-105 transition-all text-xs font-bold leading-none cursor-pointer"
                    title="Launch cinematic trailer player"
                  >
                    <Play className="w-5.5 h-5.5 fill-current ml-0.5" />
                  </button>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  </div>
                </div>
              </div>

              {/* Column 2: Keep shopping for lists (3 grid columns span) */}
              <div 
                id="keep-shopping-bento"
                className="lg:col-span-3 rounded-2xl bg-gradient-to-b from-[#111c30]/50 to-[#070b14] border border-white/5 p-4 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#1b2f4f]/30">
                    <h4 className="text-xs font-extrabold font-display text-white uppercase tracking-wider">Keep shopping for</h4>
                    <button className="text-[10px] text-zinc-400 hover:text-white transition-colors">Edit</button>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    {keepShoppingProducts.slice(0, 3).map((prod) => (
                      <div 
                        key={prod.id}
                        onClick={() => setSelectedProduct(prod)}
                        className="p-2 rounded-xl bg-slate-950/40 border border-white/5 flex items-center gap-3 hover:border-amber-500/35 cursor-pointer transition-colors group"
                      >
                        <img src={prod.imageUrl} alt={prod.title} className="w-9 h-9 rounded object-cover border border-[#1b2f4f]" />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-[10px] font-bold text-white truncate group-hover:text-amber-400 transition-colors leading-tight">{prod.title}</h5>
                          <span className="font-mono text-[11px] font-black text-amber-400 mt-0.5 block">${prod.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('stuff')}
                  className="w-full text-center text-xs font-bold text-amber-400 hover:text-amber-300 transition-all cursor-pointer mt-4"
                >
                  View full recent registry
                </button>
              </div>

              {/* Column 3: Active Seattle GPS Drone Tracker Your Orders (3 grid columns span) */}
              <div id="drone-tracker-bento" className="lg:col-span-3 h-full">
                <OrdersWidget orders={orders} onOpenRufus={() => setRufusIsOpen(true)} />
              </div>

              {/* Column 4: Ecological Sustainability valley view (3 grid columns span) */}
              <div 
                id="sustainability-bento"
                className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/5 bg-[#0a0f1d] relative min-h-[300px] flex flex-col justify-between p-4"
              >
                <img 
                  src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=400" 
                  alt="Lush green nature valley mountain" 
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02050b] via-[#02050b]/40 to-transparent" />

                <div className="z-10 text-left">
                  <h4 className="text-xs font-extrabold font-display text-white uppercase tracking-wider">Sustainability</h4>
                  <p className="text-[10px] text-zinc-300 mt-1">Shop climate friendly products crafted exclusively in compostable fibers.</p>
                </div>

                <div className="z-10 text-left">
                  <div className="bg-emerald-500/10 border border-emerald-500/25 p-2 rounded-xl flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
                    <div>
                      <p className="text-[10px] text-white font-extrabold font-display leading-tight">Climate Pledge Friendly</p>
                      <p className="text-[9px] text-zinc-400">Restoring resources 100%</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setSelectedProduct(MOCK_PRODUCTS.find(p => p.id === 'ai-sus-tech') || null);
                    }}
                    className="text-[10px] text-zinc-400 hover:text-white mt-3 inline-block font-sans hover:underline cursor-pointer"
                  >
                    See sustainable products →
                  </button>
                </div>

              </div>

            </section>

            {/* BOTTOM SEGMENT: TOP CATEGORIES SCROLLING row (Fully responsive) */}
            <section id="categories-grid-bottom" className="pt-4 pb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-extrabold font-display text-white uppercase tracking-wider text-left">Top categories</h4>
                <button 
                  onClick={() => setActiveTab('more')}
                  className="text-xs text-zinc-400 hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Explore all
                </button>
              </div>

              {/* Scrolling row */}
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
                {[
                  { label: 'Deals', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=150' },
                  { label: 'Electronics', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=150' },
                  { label: 'Fashion', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=150' },
                  { label: 'Home', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=150' },
                  { label: 'Beauty', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=150' },
                  { label: 'Books', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=150' },
                  { label: 'Toys & Games', img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=150' },
                  { label: 'Automotive', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=150' },
                  { label: 'Groceries', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=150' },
                  { label: 'Pet Supplies', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=150' }
                ].map((cat, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveTab('more')}
                    className="min-w-[100px] flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-[#1b2f4f]/30 ring-2 ring-transparent group-hover:ring-amber-500/40 group-hover:border-transparent transition-all shadow-inner">
                      <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white transition-colors">{cat.label}</span>
                  </div>
                ))}
              </div>
            </section>

          </main>
        ) : (
          /* Elegant generic fallback view for secondary options, styled nicely in deep blue glass card */
          <main className="flex-1 p-6 max-w-4xl mx-auto w-full flex flex-col justify-center items-center">
            <div className="glass-panel p-8 rounded-2xl text-center border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/5 rounded-full blur-2xl" />
              <Layers className="w-11 h-11 text-amber-400 mb-4 mx-auto animate-pulse" />
              <h3 className="text-base font-black font-display text-white uppercase tracking-wider">Secondary Registry: {activeTab}</h3>
              <p className="text-xs text-zinc-300 max-w-[400px] leading-relaxed mx-auto mt-2">
                This physical logistics channel is fully buffered under Seattle 2030 network pipelines. Try clicking **Home** or initializing our **Ask Rufus** live AI assistant to chat and checkout products!
              </p>
              
              <button 
                onClick={() => setActiveTab('home')}
                className="mt-6 px-4 py-2 bg-amber-500 text-[#070b13] font-bold text-xs rounded-lg hover:bg-amber-400 transition-all cursor-pointer"
              >
                Return to home dashboard
              </button>
            </div>
          </main>
        )}

        {/* Dynamic Interactive Slide drawers / Popups */}
        <RufusAssistant 
          isOpen={rufusIsOpen} 
          onClose={() => setRufusIsOpen(false)} 
          messages={messages}
          setMessages={setMessages}
          products={MOCK_PRODUCTS}
          onSelectProduct={setSelectedProduct}
          onAddToCart={handleAddToCart}
        />

        <CheckoutModal 
          isOpen={cartIsOpen} 
          onClose={() => setCartIsOpen(false)} 
          cart={cart}
          onRemoveItem={handleRemoveCartItem}
          onModifyQty={handleModifyQty}
          onCompleteCheckout={handleCompleteCheckout}
        />

        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={handleAddToCart}
        />

        <ExpanseModal 
          isOpen={expanseIsOpen} 
          onClose={() => setExpanseIsOpen(false)} 
        />

      </div>
    </div>
  );
}
