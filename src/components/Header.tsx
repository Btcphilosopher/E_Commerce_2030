import React, { useState } from 'react';
import { 
  Search, MapPin, ChevronDown, ShoppingCart, 
  Sparkles, History, Compass, Bell, Cpu
} from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenRufus: () => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ 
  cartCount, onOpenCart, onOpenRufus, onSelectProduct, products, activeTab, setActiveTab 
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Simple fuzzy keyword matching against mock products
  const suggestions = searchQuery.trim() 
    ? products.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.searchContext?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5) 
    : [];

  const handleSuggestionClick = (p: Product) => {
    setSearchQuery('');
    setShowSuggestions(false);
    onSelectProduct(p);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  return (
    <header id="app-header" className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex flex-col gap-2.5 z-30">
      <div className="flex items-center justify-between gap-6">
        
        {/* Navigation Horizontal Menu links matched to image */}
        <div id="header-nav-container" className="flex items-center gap-6 text-[10px] uppercase tracking-[0.18em]">
          <button 
            id="header-nav-shop"
            onClick={() => setActiveTab('more')}
            className="flex items-center gap-1 text-zinc-300 hover:text-[#c1a35f] transition-colors cursor-pointer"
          >
            <span>Shop</span>
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>
          
          <button 
            id="header-nav-rufus"
            onClick={onOpenRufus}
            className="flex items-center gap-1 text-[#c1a35f] hover:text-[#d9bf86] transition-colors cursor-pointer font-bold"
          >
            <Sparkles className="w-3 h-3 animate-pulse text-[#c1a35f]" />
            <span>AI Assistant</span>
          </button>

          <button 
            id="header-nav-deals"
            onClick={() => setActiveTab('lists')}
            className={`transition-colors cursor-pointer ${activeTab === 'lists' ? 'text-[#c1a35f] font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            Today's Deals
          </button>
          
          <button 
            id="header-nav-prime"
            onClick={() => setActiveTab('prime')}
            className={`transition-colors cursor-pointer ${activeTab === 'prime' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            Prime
          </button>

          <button 
            id="header-nav-trending"
            onClick={() => setActiveTab('stuff')}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer hidden md:inline"
          >
            Trending
          </button>

          <button 
            id="header-nav-brands"
            onClick={() => setActiveTab('more')}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer hidden lg:inline"
          >
            Brands
          </button>
        </div>

        {/* Global Instant Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-sm mx-4 hidden sm:block">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search Curated Mastery collections..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-9 pr-4 py-1.5 rounded-none text-xs bg-[#161616] text-zinc-100 placeholder-zinc-500 border border-white/10 focus:outline-none focus:border-[#c1a35f] focus:ring-1 focus:ring-[#c1a35f]/30 transition-all font-sans"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-[#c1a35f] transition-colors" />
            <Cpu className="absolute right-3 top-2.5 w-3.5 h-3.5 text-[#c1a35f]/40 animate-pulse pointer-events-none" />
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-[#121212] border border-white/10 rounded-none overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 bg-[#181818] border-b border-white/5 flex items-center justify-between text-[9px] uppercase tracking-wider text-zinc-400">
                <span className="font-mono flex items-center gap-1 text-[#c1a35f]"><Compass className="w-3 h-3" /> Exhibition Search</span>
                <span>Select to open spec sheet</span>
              </div>
              <ul className="divide-y divide-white/5">
                {suggestions.map(product => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(product)}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#1c1c1c] transition-colors flex items-center gap-3"
                    >
                      <img src={product.imageUrl} alt={product.title} className="w-8 h-8 rounded-none object-cover border border-white/10" />
                      <div className="flex-1 truncate">
                        <p className="text-xs font-semibold text-zinc-100 truncate">{product.title}</p>
                        <p className="text-[10px] text-zinc-400 capitalize">{product.category}</p>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#c1a35f]">${product.price.toFixed(2)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>

        {/* User Stats / Location / Cart Actions */}
        <div id="header-actions" className="flex items-center gap-4 shrink-0">
          
          {/* Location details */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-none bg-[#161616] border border-white/5 max-w-[130px] hidden md:flex">
            <MapPin className="w-3.5 h-3.5 text-[#c1a35f] animate-pulse shrink-0" />
            <div className="text-[9px] uppercase tracking-wider truncate leading-tight text-left">
              <p className="text-zinc-500">Deliver to</p>
              <p className="text-zinc-200 font-bold truncate">Seattle, WA</p>
            </div>
          </div>

          {/* User profile identifier precisely styled like image */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-none hover:bg-white/5 transition-colors cursor-pointer">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                alt="Alex Avatar" 
                className="w-7 h-7 rounded-none object-cover ring-1 ring-[#c1a35f]/60"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-black" />
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium">Hello, Alex</p>
              <p className="text-[10px] text-zinc-200 font-bold tracking-wide">Prime</p>
            </div>
          </div>

          {/* Shopping Cart button */}
          <button 
            id="header-cart-btn"
            onClick={onOpenCart}
            className="relative p-2 rounded-none bg-[#161616] border border-white/10 text-zinc-300 hover:text-[#c1a35f] hover:border-[#c1a35f] hover:shadow-[0_0_15px_rgba(193,163,95,0.15)] transition-all cursor-pointer group"
          >
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[9px] font-bold text-white shadow-md animate-scale">
                {cartCount}
              </span>
            )}
            <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          </button>

        </div>
      </div>
    </header>
  );
}
