import React, { useState } from 'react';
import { 
  X, Star, Shield, Trophy, Activity, Truck, 
  Settings, ShoppingBag, Eye, Heart, ListPlus, Sparkles
} from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState('Carbon Gray');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div id="product-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="product-modal-container"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-none bg-[#0c0c0c] border border-white/5 shadow-2xl flex flex-col md:flex-row gap-6 p-6 animate-in zoom-in-95 duration-200"
      >
        {/* Gold Corner accents from Sophisticated Dark design */}
        <div className="absolute top-[1.5px] left-[1.5px] w-4 h-4 border-t border-l border-[#c1a35f]" />
        <div className="absolute bottom-[1.5px] right-[1.5px] w-4 h-4 border-b border-r border-[#c1a35f]" />

        {/* Close button */}
        <button 
          id="close-product-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-none bg-zinc-900/60 hover:bg-[#c1a35f] border border-white/5 hover:text-black text-zinc-400 transition-all z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Dynamic Showcase Image */}
        <div className="flex-1 flex flex-col gap-4 text-left">
          <div className="relative rounded-none overflow-hidden bg-[#111] border border-white/5 h-80 flex items-center justify-center group shadow-inner">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            {product.discount && (
              <span className="absolute top-4 left-4 bg-amber-600 text-white font-bold font-mono text-[9px] px-2.5 py-0.5 rounded-none shadow-md uppercase tracking-wider">
                {product.discount} TODAY
              </span>
            )}

            {/* Glowing active brand tag */}
            <span className="absolute bottom-4 right-4 bg-black/80 border border-[#c1a35f]/40 text-[#c1a35f] text-[9px] uppercase tracking-widest font-bold font-mono px-3 py-1 rounded-none flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-pulse" /> Grounded Archive 2030
            </span>
          </div>

          <div className="flex gap-2">
            <div className="w-16 h-12 rounded-none overflow-hidden border border-[#c1a35f]/60 cursor-pointer">
              <img src={product.imageUrl} alt="thumb-1" className="w-full h-full object-cover" />
            </div>
            <div className="w-16 h-12 rounded-none bg-[#121212] border border-white/5 cursor-not-allowed opacity-50 flex items-center justify-center text-[10px] text-zinc-500 font-mono">
              3D CAD
            </div>
            <div className="w-16 h-12 rounded-none bg-[#121212] border border-white/5 cursor-not-allowed opacity-50 flex items-center justify-center text-[10px] text-zinc-500 font-mono">
              X-RAY
            </div>
          </div>
        </div>

        {/* Right Side: Product Description, tech specs sheets */}
        <div className="flex-1 flex flex-col justify-between text-left">
          <div>
            <div className="flex items-center gap-2 text-[10px] text-[#c1a35f] font-bold font-mono uppercase tracking-widest leading-none">
              <span>{product.category}</span>
              <span>•</span>
              <span className="text-zinc-500">Inventory Verified</span>
            </div>

            <h2 className="text-lg font-bold text-white uppercase tracking-wider mt-1.5 leading-tight font-display pr-6">{product.title}</h2>
            
            {/* Rating information */}
            <div className="flex items-center gap-3 mt-2.5">
              <div className="flex items-center gap-1 bg-[#121212] border border-white/5 px-2 py-0.5 rounded-none text-[#c1a35f] text-xs font-bold leading-none">
                <Star className="w-3 h-3 fill-current" />
                <span className="font-mono text-[11px]">{product.rating}</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium font-mono">{product.reviewCount.toLocaleString()} archive reviews</span>
            </div>

            {/* Price lines */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-xl font-bold text-[#c1a35f] font-mono">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xs text-zinc-500 line-through font-mono">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-[10px] text-white font-bold bg-amber-700/20 border border-amber-600/30 px-1.5 py-0.5 rounded-none font-mono uppercase tracking-wider select-none">
                    Save {(100 - (product.price / product.originalPrice) * 100).toFixed(0)}%
                  </span>
                </>
              )}
            </div>

            {/* Product intro paragraph */}
            <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans">{product.description}</p>

            {/* Futuristic Tech Specifications Specs box */}
            <div className="mt-5 border border-white/5 rounded-none bg-[#121212]">
              <div className="px-3.5 py-1.5 border-b border-white/5 text-[9px] uppercase tracking-wider text-zinc-400 font-bold font-mono flex items-center justify-between">
                <span>SPECIFICATIONS SPEC SHEET</span>
                <Settings className="w-3.5 h-3.5 text-[#c1a35f] animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <ul className="divide-y divide-white/5 text-[11px] font-sans">
                {Object.entries(product.specs).map(([key, val]) => (
                  <li key={key} className="px-3.5 py-2.5 flex justify-between gap-4">
                    <span className="text-zinc-500 font-semibold truncate shrink-0">{key}</span>
                    <span className="text-zinc-300 font-medium text-right break-words">{val}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick configuration option */}
            {product.category === 'Electronics' || product.category === 'Wellness & Tech' ? (
              <div className="mt-5">
                <p className="text-[10px] uppercase font-mono font-bold text-zinc-500 tracking-wider">Chassis options:</p>
                <div className="flex gap-2.5 mt-2">
                  {['Carbon Gray', 'Fusion Gold', 'Quantum Teal'].map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-none border cursor-pointer transition-all ${
                        selectedColor === color 
                          ? 'bg-[#c1a35f]/15 border-[#c1a35f] text-[#c1a35f]' 
                          : 'bg-[#121212] border-white/5 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

          </div>

          {/* Quick Buy Checkout and Quantity button triggers */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Qty:</span>
              <div className="flex items-center rounded-none bg-[#121212] border border-white/5 p-1 font-mono text-xs">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="px-2 py-0.5 text-zinc-450 hover:text-white rounded hover:bg-white/5 active:scale-95 cursor-pointer"
                >-</button>
                <span className="px-3 font-semibold text-zinc-100">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="px-2 py-0.5 text-zinc-450 hover:text-white rounded hover:bg-white/5 active:scale-95 cursor-pointer"
                >+</button>
              </div>
            </div>

            <div className="flex-1 flex gap-3">
              <button 
                id="modal-add-to-cart"
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    onAddToCart(product);
                  }
                  onClose();
                }}
                className="flex-grow flex items-center justify-center gap-2 bg-[#c1a35f] text-black hover:bg-[#d9bf86] font-bold text-xs py-3 rounded-none transition-all cursor-pointer shadow-md shadow-[#c1a35f]/10 active:scale-97 uppercase tracking-wider"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
