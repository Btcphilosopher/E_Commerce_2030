import React, { useState, useEffect } from 'react';
import { 
  Package, MapPin, Navigation, Compass, Sparkles, 
  Clock, Truck, CheckCircle2, ChevronDown, Award
} from 'lucide-react';
import { Order } from '../types';

interface OrdersWidgetProps {
  orders: Order[];
  onOpenRufus: () => void;
}

export default function OrdersWidget({ orders, onOpenRufus }: OrdersWidgetProps) {
  const [droneCoord, setDroneCoord] = useState({ x: 30, y: 70 });
  const [activeStep, setActiveStep] = useState(3); // 'Out for Local delivery'

  // Animate the flying drone coordinate along the Seattle street grid route in real-time
  useEffect(() => {
    const routePoints = [
      { x: 30, y: 70 },
      { x: 45, y: 55 },
      { x: 65, y: 55 },
      { x: 75, y: 40 },
      { x: 88, y: 32 }
    ];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % routePoints.length;
      setDroneCoord(routePoints[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="bg-[#121212] p-5 rounded-none border border-white/5 h-full flex flex-col justify-center items-center text-center">
        <Package className="w-10 h-10 text-zinc-650 mb-3" />
        <h4 className="text-[11px] uppercase tracking-wider font-bold text-zinc-350">No active cargo trackers</h4>
        <p className="text-[10.5px] text-zinc-500 mt-1 max-w-[180px] mx-auto leading-relaxed">
          Add tech products to your cart and check out using drone dispatch to configure active delivery telemetry.
        </p>
      </div>
    );
  }

  const latestOrder = orders[orders.length - 1];

  return (
    <div id="orders-widget-main" className="bg-[#121212] p-5 rounded-none border border-white/5 h-full flex flex-col gap-4">
      {/* Title block */}
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h4 className="text-xs font-bold font-display text-white uppercase tracking-widest">Active Orders Terminal</h4>
          <span className="text-[9px] text-[#c1a35f] capitalize bg-white/5 px-2 py-0.5 border border-[#c1a35f]/20 rounded-none font-mono mt-1.5 inline-block">
            {latestOrder.id} Tracer Active
          </span>
        </div>
        <button 
          id="orders-rufus-help"
          onClick={onOpenRufus}
          className="text-[9px] text-[#c1a35f] border border-[#c1a35f]/30 px-2.5 py-0.5 rounded-none hover:bg-[#c1a35f]/10 cursor-pointer transition-all uppercase font-mono tracking-wider"
        >
          Request Split Delivery
        </button>
      </div>

      {/* Arriving Today status text */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-none p-3 flex items-start gap-3">
        <Clock className="w-4 h-4 text-emerald-450 shrink-0 mt-0.5 animate-pulse" />
        <div className="text-left">
          <p className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest leading-none">Arriving Today</p>
          <p className="text-[9.5px] text-zinc-400 mt-1 uppercase tracking-wider">Scheduled Landing Corridor:</p>
          <p className="text-xs font-bold text-white mt-1 uppercase tracking-wide">{latestOrder.deliveryDate}</p>
        </div>
      </div>

      {/* Interactive Seattle Map SVG Overlay with coordinates */}
      <div className="relative rounded-none overflow-hidden bg-black border border-white/5 h-36">
        
        {/* Schematic Seattle street lines */}
        <svg className="absolute inset-0 w-full h-full opacity-25 text-zinc-800" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="20" x2="100%" y2="20" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="60" x2="100%" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="100" x2="100%" y2="100" stroke="currentColor" strokeWidth="1" />
          
          <line x1="30" y1="0" x2="30" y2="100%" stroke="currentColor" strokeWidth="1" />
          <line x1="75" y1="0" x2="75" y2="100%" stroke="currentColor" strokeWidth="1" />
          <line x1="120" y1="0" x2="120" y2="100%" stroke="currentColor" strokeWidth="1" />
          
          {/* Diagonal avenues */}
          <line x1="0" y1="10" x2="100%" y2="110" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
          <line x1="10" y1="100" x2="100%" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
        </svg>

        {/* Route line drawn underneath */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <polyline 
            points="30,70 45,55 65,55 75,40 88,32" 
            fill="none" 
            stroke="#c1a35f" 
            strokeWidth="2" 
            strokeLinecap="round"
            strokeDasharray="4,4"
            className="opacity-75"
          />
        </svg>

        {/* Base Seattle marker dots representing distribution hub and delivery address */}
        <div className="absolute left-[30%] top-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <span className="w-2 h-2 rounded-full bg-zinc-650 ring-2 ring-zinc-500/25" />
          <span className="text-[8px] text-zinc-500 font-mono scale-90 mt-0.5 font-bold">HUB</span>
        </div>

        <div className="absolute left-[88%] top-[32%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <MapPin className="w-3.5 h-3.5 text-[#c1a35f] animate-bounce" />
          <span className="text-[8px] text-[#c1a35f] font-mono scale-90 font-bold mt-0.5">VAULT</span>
        </div>

        {/* Dynamic Flying Drone Dot with coordinate state */}
        <div 
          className="absolute transition-all duration-[1000ms] ease-out -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${droneCoord.x}%`, top: `${droneCoord.y}%` }}
        >
          {/* Echo radar ripple */}
          <span className="absolute inset-0 rounded-full w-6 h-6 bg-[#c1a35f]/20 -m-1.5 animate-ping" />
          <div className="relative w-3.5 h-3.5 rounded-full bg-[#c1a35f] border border-black flex items-center justify-center shadow-md">
            <Navigation className="w-2 h-2 text-black fill-current rotate-45 transform" />
          </div>
        </div>

        {/* Information overlay */}
        <div className="absolute top-2 left-2 bg-[#0c0c0c]/90 border border-white/5 px-2 py-0.5 rounded-none text-[8px] font-mono uppercase text-zinc-400 tracking-wide flex items-center gap-1.5">
          <Compass className="w-3 nav-icon text-[#c1a35f] animate-spin" style={{ animationDuration: '4s' }} />
          <span>Seattle Drone Flight Argo-4 Active</span>
        </div>
      </div>

      {/* Package Contents / On the way */}
      <div>
        <p className="text-[9px] text-zinc-500 uppercase font-mono font-bold text-left tracking-widest">Active Dispatch Manifest:</p>
        <div className="flex gap-2.5 mt-2.5">
          {latestOrder.items.slice(0, 3).map((it) => (
            <div 
              key={it.id}
              className="px-2.5 py-1.5 rounded-none bg-black border border-white/5 flex items-center gap-2 max-w-[124px] truncate group hover:border-[#c1a35f]/30 transition-all cursor-pointer"
              title={it.title}
            >
              <img src={it.imageUrl} alt={it.title} className="w-5 h-5 rounded-none object-cover shadow-sm shrink-0" />
              <span className="text-[10px] text-zinc-300 font-medium truncate group-hover:text-[#c1a35f] transition-colors leading-none uppercase tracking-wide">{it.title}</span>
            </div>
          ))}
          {latestOrder.items.length > 3 && (
            <div className="px-2 py-1.5 rounded-none bg-black border border-white/5 flex items-center justify-center text-[9px] text-zinc-550 font-mono">
              +{latestOrder.items.length - 3} MORE
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
