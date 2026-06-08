import React from 'react';
import { Sparkles, Star, Plus, ShieldCheck, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  variant: 'recommended' | 'aiPick' | 'deal';
  onSelect: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

export default function ProductCard({ product, variant, onSelect, onAddToCart }: ProductCardProps) {
  
  // Recommended cards variant (top right section, dark and neat)
  if (variant === 'recommended') {
    return (
      <div 
        id={`product-recommended-${product.id}`}
        onClick={onSelect}
        className="group min-w-[200px] max-w-[220px] p-4 rounded-none bg-[#121212] border border-white/5 hover:border-[#c1a35f]/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer select-none flex flex-col gap-3"
      >
        <div className="relative overflow-hidden rounded-none bg-[#161616] h-28 flex items-center justify-center border border-white/5">
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.discount && (
            <span className="absolute top-1.5 left-1.5 bg-[#c1a35f] text-black font-bold font-mono text-[9px] px-1.5 py-0.5 rounded-none uppercase tracking-wider">
              {product.discount}
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-bold text-white group-hover:text-[#c1a35f] transition-colors truncate font-sans">{product.title}</h4>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] text-zinc-400 font-medium capitalize">{product.category}</span>
              <span className="text-[9px] text-zinc-500">•</span>
              <div className="flex items-center text-[#c1a35f] text-[10px]">
                <Star className="w-2.5 h-2.5 fill-current" />
                <span className="ml-0.5 font-bold font-mono">{product.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-col text-left">
              <span className="font-mono text-xs font-black text-[#c1a35f]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="font-mono text-[10px] text-zinc-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            
            <button 
              id={`add-recommended-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(e);
              }}
              className="p-1.5 rounded-none bg-[#c1a35f]/10 text-[#c1a35f] hover:bg-[#c1a35f] hover:text-black border border-[#c1a35f]/25 hover:border-transparent transition-all shadow-md active:scale-95 cursor-pointer"
              title="Quick Add to Cart"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AI Selection / Discover More cards variant (futuristic portrait bento box with full image background overlay)
  if (variant === 'aiPick') {
    return (
      <div 
        id={`product-aipick-${product.id}`}
        onClick={onSelect}
        className="group relative h-80 rounded-none overflow-hidden border border-white/5 hover:border-[#c1a35f]/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg select-none"
      >
        {/* Background Image scaling gracefully */}
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Cinematic gradient vignette underlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        
        {/* Upper Brand Overlay tags */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-left">
          <div>
            <span className="text-[10px] text-[#c1a35f] font-bold tracking-widest uppercase font-mono">
              {product.id === 'ai-lifestyle' ? 'For your lifestyle' : 
               product.id === 'ai-foundation' ? "Because you watched 'Foundation'" :
               product.id === 'ai-sus-tech' ? 'Top picks in sustainable tech' :
               product.id === 'ai-trending' ? 'New & trending' : 'Inspired by recent searches'}
            </span>
            <h4 className="text-[12px] font-bold text-white uppercase tracking-wider font-display mt-0.5 max-w-[160px] line-clamp-1">
              {product.id === 'ai-lifestyle' ? 'Smart picks based on routine' :
               product.id === 'ai-foundation' ? 'Sci-fi picks for you' :
               product.id === 'ai-sus-tech' ? 'Innovate responsibly' :
               product.id === 'ai-trending' ? "Shop what's hot right now" : 'Explore more finds'}
            </h4>
          </div>
          
          <div className="w-7 h-7 rounded-none bg-black/85 backdrop-blur-md flex items-center justify-center text-[#c1a35f] border border-[#c1a35f]/40">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
        </div>

        {/* Lower Price specifications details bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-100 group-hover:text-[#c1a35f] transition-colors line-clamp-1 truncate pr-2 max-w-[140px] font-sans">{product.title}</p>
            <p className="text-[9px] text-zinc-400 uppercase font-mono font-semibold tracking-wide capitalize">{product.category}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="font-mono text-xs font-black text-[#c1a35f]">${product.price.toFixed(2)}</span>
              {product.discount && (
                <span className="text-[9px] text-zinc-900 font-bold font-mono bg-[#c1a35f] px-1 py-0.2 rounded-none">{product.discount}</span>
              )}
            </div>
          </div>

          <button 
            id={`add-aipick-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(e);
            }}
            className="p-2 rounded-none bg-[#c1a35f] text-black hover:bg-[#d9bf86] transition-all font-bold shadow-md shadow-[#c1a35f]/10 active:scale-95 cursor-pointer max-w-[80px]"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Today's Deals cards variant (represented exactly as the Sophisticated Dark cells)
  if (variant === 'deal') {
    return (
      <div 
        id={`product-deal-${product.id}`}
        onClick={onSelect}
        className="group relative p-4 rounded-none bg-gradient-to-b from-[#161616] to-[#121212] hover:from-[#1c1c1c] hover:to-[#161616] border border-white/5 hover:border-[#c1a35f]/40 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-xl cursor-pointer select-none flex flex-col gap-3 text-zinc-200"
      >
        <div className="relative overflow-hidden rounded-none bg-[#111] h-40 flex items-center justify-center border border-white/5">
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="h-32 object-contain transition-transform duration-500 group-hover:scale-105"
          />
          {product.discount && (
            <span className="absolute top-2 left-2 bg-amber-600 text-white font-bold font-sans text-[10px] px-2 py-0.5 rounded-none uppercase tracking-wider">
              {product.discount}
            </span>
          )}
        </div>

        <div className="text-left flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="bg-[#c1a35f]/10 text-[#c1a35f] font-bold font-sans text-[9px] px-1.5 py-0.5 rounded-none uppercase tracking-wider border border-[#c1a35f]/20">Today's Deal</span>
              <span className="text-[10px] text-zinc-500 font-mono capitalize">{product.category}</span>
            </div>
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-white mt-2 lines-2-clamp max-h-8 truncate font-sans">{product.title}</h4>
          </div>

          <div className="flex items-end justify-between mt-4 border-t border-white/5 pt-3">
            <div className="flex flex-col text-left">
              <div className="flex items-baseline gap-1">
                <span className="text-[9px] text-[#c1a35f] font-extrabold font-sans uppercase">deal price:</span>
                <span className="font-sans text-[11px] font-black leading-none text-white">$</span>
                <span className="font-sans text-sm font-black leading-none text-[#f5f2ed]">{Math.floor(product.price)}</span>
                <span className="font-sans text-[11px] font-black leading-none text-white">.{(product.price % 1).toFixed(2).split('.')[1]}</span>
              </div>
              {product.originalPrice && (
                <span className="font-mono text-[10px] text-zinc-500 line-through mt-0.5">List Price: ${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <button 
              id={`add-deal-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(e);
              }}
              className="p-1.5 rounded-none bg-[#c1a35f] text-black hover:bg-[#d9bf86] border border-transparent transition-all shadow-sm font-bold active:scale-95 cursor-pointer animate-none"
              title="Add Deal to Cart"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
