import React, { useState, useRef } from 'react';
import { 
  X, Trash2, ShoppingCart, HelpCircle, Flame, 
  MapPin, CheckCircle, ChevronRight, Zap, Shield, ArrowRight
} from 'lucide-react';
import { CartItem, Product, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (prodId: string) => void;
  onModifyQty: (prodId: string, delta: number) => void;
  onCompleteCheckout: (newOrder: Order) => void;
}

export default function CheckoutModal({ 
  isOpen, onClose, cart, onRemoveItem, onModifyQty, onCompleteCheckout 
}: CheckoutModalProps) {
  const [shippingOption, setShippingOption] = useState<'drone' | 'suborbital'>('drone');
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = shippingOption === 'drone' ? 4.99 : 14.99;
  const carbonSurcharge = 1.25;
  const tax = subtotal * 0.088; // 8.8% Washington tax rate
  const total = subtotal > 0 ? subtotal + shippingCost + carbonSurcharge + tax : 0;

  // Touch/Click Swipe controller to complete checkout
  const handleSliderDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isCheckedOut || subtotal === 0) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const sliderWidth = sliderRef.current?.offsetWidth || 1;
    const sliderLeft = sliderRef.current?.getBoundingClientRect().left || 0;
    
    let position = ((clientX - sliderLeft) / sliderWidth) * 100;
    position = Math.max(0, Math.min(position, 100));
    setSliderPosition(position);

    if (position > 90) {
      triggerSuccessCheckout();
    }
  };

  const handleSliderRelease = () => {
    if (sliderPosition < 90) {
      setSliderPosition(0);
    }
  };

  const triggerSuccessCheckout = () => {
    setIsCheckedOut(true);
    setSliderPosition(100);

    const orderId = `ord-${['A', 'B', 'C', 'X'][Math.floor(Math.random() * 4)]}${Math.floor(100000 + Math.random() * 900000)}`;
    
    const newOrder: Order = {
      id: orderId,
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: shippingOption === 'drone' ? 'Arriving Today, 1:30 PM - 3:30 PM' : 'Arriving in 15 Minutes (Sub-orbital)',
      status: 'out_for_delivery',
      items: cart.map(item => ({
         id: `purchased-${item.product.id}`,
         title: item.product.title,
         price: item.product.price,
         imageUrl: item.product.imageUrl,
         quantity: item.quantity
      })),
      trackingSteps: [
        { status: 'Order Confirmed', time: 'Just now', completed: true },
        { status: 'Cargo Dispatched via Autonomous Port', time: 'In progress', completed: true },
        { status: `Assigned Drone ${shippingOption === 'drone' ? 'Argo-4' : 'Pegasus-9'}`, time: 'In routing', completed: false }
      ],
      currentLocation: { lat: 47.6062, lng: -122.3321 } // Seattle
    };

    setTimeout(() => {
      onCompleteCheckout(newOrder);
    }, 1200);
  };

  return (
    <div id="checkout-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-end bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="checkout-drawer-container"
        className="w-full sm:w-112 h-screen bg-[#0a0a0a]/98 border-l border-white/5 shadow-2xl flex flex-col justify-between p-5 animate-in slide-in-from-right duration-300 relative"
      >
        {/* Accent gold corner */}
        <div className="absolute top-[1.5px] left-[1.5px] w-4 h-4 border-t border-l border-[#c1a35f]" />

        {/* Upper title bar */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#c1a35f]" />
              <h3 className="text-xs uppercase tracking-widest font-bold text-white font-display">Aurelian Vault Cart</h3>
              <span className="text-[9px] bg-white/5 border border-[#c1a35f]/20 text-[#c1a35f] px-2 py-0.5 rounded-none font-mono font-bold">
                {cart.length} ITEMS
              </span>
            </div>
            <button 
              id="close-checkout"
              onClick={onClose} 
              className="p-1.5 rounded-none hover:bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart products scrolling list */}
          <div className="flex-1 max-h-[42vh] overflow-y-auto no-scrollbar py-4 space-y-3.5">
            {isCheckedOut ? (
              <div className="py-12 text-center text-zinc-100 flex flex-col items-center gap-3">
                <CheckCircle className="w-10 h-10 text-[#c1a35f] animate-pulse animate-none" />
                <h4 className="text-xs uppercase tracking-wider font-bold">Aurelian Delivery Scheduled</h4>
                <p className="text-xs text-zinc-400 max-w-[240px] leading-relaxed mx-auto">
                  Autonomous delivery channels reserved. Monitor progress live in your orders terminal.
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 flex flex-col items-center gap-3">
                <p className="text-xs font-sans">The vault is currently empty. Explore products to populate inventory requests.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex items-center gap-3 p-3 rounded-none bg-[#121212] border border-white/5 hover:border-[#c1a35f]/25 transition-colors relative group"
                >
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.title} 
                    className="w-14 h-14 rounded-none object-cover border border-white/5"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wider truncate pr-4">{item.product.title}</h5>
                    <p className="text-[9px] text-zinc-400 mt-0.5 leading-none capitalize">{item.product.category}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-mono text-xs font-black text-[#c1a35f]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      
                      {/* Quantity change buttons */}
                      <div className="flex items-center rounded-none bg-[#161616] border border-white/5 p-0.5 font-mono text-[10px]">
                        <button 
                          onClick={() => onModifyQty(item.product.id, -1)}
                          className="px-1.5 py-0.2 text-zinc-450 hover:text-white rounded cursor-pointer"
                        >-</button>
                        <span className="px-2 font-semibold text-zinc-300">{item.quantity}</span>
                        <button 
                          onClick={() => onModifyQty(item.product.id, 1)}
                          className="px-1.5 py-0.2 text-zinc-450 hover:text-white rounded cursor-pointer"
                        >+</button>
                      </div>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button 
                    id={`remove-cart-item-${item.product.id}`}
                    onClick={() => onRemoveItem(item.product.id)}
                    className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-red-400 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-none cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Price Sums & Interactive Check-out Slider */}
        <div className="border-t border-white/5 pt-4 mt-auto">
          
          {/* Shipping speed selection */}
          {!isCheckedOut && cart.length > 0 && (
            <div className="bg-[#121212] border border-white/5 rounded-none p-3.5 mb-4 text-left">
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-[#c1a35f] flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#c1a35f]" /> DISPATCH GRID CONFIGURATION:
              </span>
              <div className="flex gap-2.5 mt-2.5">
                <button
                  type="button"
                  onClick={() => setShippingOption('drone')}
                  className={`flex-1 p-2.5 rounded-none border text-xs text-left cursor-pointer transition-all ${
                    shippingOption === 'drone' 
                      ? 'bg-[#c1a35f]/10 border-[#c1a35f] text-[#c1a35f]' 
                      : 'bg-black/45 border-white/5 text-zinc-400 hover:border-white/10'
                  }`}
                >
                  <p className="font-bold font-sans uppercase tracking-wider text-[10px] flex items-center justify-between">DRONE CHASSIS <span className="font-mono text-[#c1a35f]">$4.99</span></p>
                  <p className="text-[9px] text-zinc-400 mt-1 leading-tight uppercase tracking-wider">balcony drop (Seattle)</p>
                </button>
                
                <button
                  type="button"
                  onClick={() => setShippingOption('suborbital')}
                  className={`flex-1 p-2.5 rounded-none border text-xs text-left cursor-pointer transition-all ${
                    shippingOption === 'suborbital' 
                      ? 'bg-[#c1a35f]/10 border-[#c1a35f] text-[#c1a35f]' 
                      : 'bg-black/45 border-white/5 text-zinc-400 hover:border-white/10'
                  }`}
                >
                  <p className="font-bold font-sans uppercase tracking-wider text-[10px] flex items-center justify-between">CAPSULE CORE <span className="font-mono text-[#c1a35f]">$14.99</span></p>
                  <p className="text-[9px] text-zinc-400 mt-1 leading-tight uppercase tracking-wider">Sub-orbital Launcher drop</p>
                </button>
              </div>
            </div>
          )}

          {/* Checkout sums */}
          <div className="space-y-1.5 text-[10px] uppercase tracking-wider text-zinc-500 mb-4 font-mono text-left">
            <div className="flex justify-between">
              <span>Cart Subtotal:</span>
              <span className="font-mono text-zinc-200">${subtotal.toFixed(2)}</span>
            </div>
            {subtotal > 0 && (
              <>
                <div className="flex justify-between">
                  <span>Balcony Drone Port Fee:</span>
                  <span className="font-mono text-zinc-200">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbon-Neutral Surcharge:</span>
                  <span className="font-mono text-zinc-200">${carbonSurcharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VA State Tax (8.8%):</span>
                  <span className="font-mono text-zinc-200">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold border-t border-white/5 pt-2 mt-2">
                  <span className="text-[#f5f2ed]">Total Order Sum:</span>
                  <span className="font-mono text-[#c1a35f] text-sm">${total.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>

          {/* SWIPE TO CHECKOUT SLIDER BUTTON - extremely neat play gimmick */}
          {!isCheckedOut && cart.length > 0 ? (
            <div 
              ref={sliderRef}
              onMouseMove={handleSliderDrag}
              onMouseUp={handleSliderRelease}
              onMouseLeave={handleSliderRelease}
              onTouchMove={handleSliderDrag}
              onTouchEnd={handleSliderRelease}
              className="relative h-12 rounded-none bg-black border border-white/10 p-1 flex items-center justify-center select-none overflow-hidden"
              id="swipe-checkout-slider"
            >
              {/* Swipe Background color progress bar */}
              <div 
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#c1a35f] to-[#dfc99e] transition-all pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              />

              {/* Slider thumb controller */}
              <div 
                className="absolute flex items-center justify-center w-10 h-10 rounded-none bg-[#c1a35f] text-black cursor-grab active:cursor-grabbing transition-all shadow-md z-10"
                style={{ left: `calc(${sliderPosition}% - ${sliderPosition * 0.4}px)` }}
              >
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Text label underneath */}
              <span className="relative text-[9px] font-bold tracking-widest text-[#f5f2ed] pointer-events-none uppercase font-display select-none">
                {sliderPosition > 70 ? 'CONFIRMING...' : 'SWIPE TO DISPATCH CAPITOL CARGO'}
              </span>
            </div>
          ) : isCheckedOut ? (
            <div className="w-full py-3 rounded-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-center text-[10px] font-bold font-mono uppercase flex items-center justify-center gap-1.5 animate-pulse">
              <span>Establishing Satellite Uplink</span>
              <span className="flex gap-1">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce" />
              </span>
            </div>
          ) : (
            <button 
              id="disabled-checkout-btn"
              disabled
              className="w-full py-3 rounded-none bg-[#121212] text-zinc-600 border border-white/5 text-[10px] font-bold font-display uppercase tracking-widest cursor-not-allowed text-center"
            >
              Vault cart is empty
            </button>
          )}

          <div className="flex justify-center items-center gap-1.5 mt-3 text-[9px] uppercase tracking-wider text-zinc-650 font-mono">
            <Shield className="w-3.5 h-3.5 text-[#c1a35f]" />
            <span>Alexa Secure 2030 Protocols Enabled</span>
          </div>

        </div>
      </div>
    </div>
  );
}
