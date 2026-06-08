import React from 'react';
import { 
  Home, Star, Package, ClipboardList, ShieldCheck, 
  ShoppingBag, Activity, Shirt, Laptop, Gamepad2, 
  BookOpen, PlusCircle, Grid, MessagesSquare, MessageSquareCode
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRufus: () => void;
  rufusIsUnread: boolean;
}

export default function Sidebar({ activeTab, setActiveTab, onOpenRufus, rufusIsUnread }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'stuff', label: 'Your Stuff', icon: Star },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'lists', label: 'Lists', icon: ClipboardList },
    { id: 'prime', label: 'Prime', icon: ShieldCheck },
    { id: 'groceries', label: 'Groceries', icon: ShoppingBag },
    { id: 'pharmacy', label: 'Pharmacy', icon: Activity },
    { id: 'fashion', label: 'Fashion', icon: Shirt },
    { id: 'electronics', label: 'Electronics', icon: Laptop },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'more', label: 'More', icon: PlusCircle },
  ];

  return (
    <aside id="sidebar-container" className="w-64 shrink-0 flex flex-col h-screen sticky top-0 overflow-y-auto no-scrollbar border-r border-white/5 bg-[#0a0a0a] p-5 z-40">
      {/* Brand logo */}
      <div className="flex flex-col mb-8 px-1">
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('home')}>
          {/* Rotated gold square with center square */}
          <div className="w-8 h-8 border border-[#c1a35f] rotate-45 flex items-center justify-center shrink-0">
            <div className="w-4 h-4 bg-[#c1a35f] rotate-[-45deg]" />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="text-xl tracking-[0.18em] font-light font-display uppercase text-[#f5f2ed]">
              Aurelian
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#c1a35f] uppercase font-mono font-bold mt-0.5">
              AMAZON 2030
            </span>
          </div>
        </div>
      </div>

      {/* Ask Rufus Brand Widget */}
      <button 
        id="sidebar-rufus-trigger"
        onClick={onOpenRufus}
        className="relative group w-full flex items-center gap-3 px-4 py-3 rounded-none mb-6 text-left transition-all overflow-hidden border border-[#c1a35f]/30 bg-[#121212] hover:border-[#c1a35f] ease-out duration-300 shadow-sm"
      >
        {/* Subtle gold backlight */}
        <div className="absolute inset-0 bg-[#c1a35f]/5 group-hover:bg-[#c1a35f]/10 transition-colors pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-24 h-24 bg-[#c1a35f]/12 rounded-full blur-xl group-hover:bg-[#c1a35f]/20 transition-all" />

        <div className="relative shrink-0 flex items-center justify-center w-8 h-8 rounded-none bg-[#c1a35f] text-black font-bold text-xs shadow-md">
          AI
        </div>

        <div className="relative flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.1em] font-bold text-white font-display">Ask Rufus</span>
            {rufusIsUnread && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#c1a35f] animate-pulse" />
            )}
          </div>
          <p className="text-[10px] text-zinc-400 font-mono tracking-wide leading-tight">Advisor Connected</p>
        </div>
      </button>

      {/* Sidebar navigation links */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-link-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-none text-xs uppercase tracking-wider transition-all duration-200 group ${
                isActive 
                  ? 'bg-white/5 text-[#c1a35f] font-semibold border-l border-[#c1a35f] pl-3' 
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-[#c1a35f]' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                <span className="font-sans font-medium">{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Grid selector / Settings at bottom */}
      <div className="mt-auto border-t border-white/5 pt-4 px-1">
        <button 
          id="sidebar-grid-all"
          onClick={() => setActiveTab('more')} 
          className="w-full flex items-center gap-3 text-zinc-400 hover:text-white transition-colors py-2 text-xs uppercase tracking-wider"
        >
          <Grid className="w-4 h-4 text-[#c1a35f]" />
          <span>All Collections</span>
        </button>
      </div>
    </aside>
  );
}
