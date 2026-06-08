import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Send, Bot, User, Sparkles, RefreshCw, 
  HelpCircle, ChevronRight, ShoppingCart, Info, Compass
} from 'lucide-react';
import { ChatMessage, Product } from '../types';

interface RufusAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function RufusAssistant({ 
  isOpen, onClose, messages, setMessages, products, onSelectProduct, onAddToCart 
}: RufusAssistantProps) {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to lowest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Format the product stock list so Rufus knows exactly what's currently shown on the screen
  const getProductsContextString = () => {
    return products.map(p => {
      return `Product ID: ${p.id}, Name: ${p.title}, Brand: ${p.category}, Price: $${p.price.toFixed(2)}${p.originalPrice ? `, Original Price: $${p.originalPrice}` : ''}. Specifications: [${Object.entries(p.specs).map(([k,v]) => `${k}: ${v}`).join(', ')}]. Core highlights: ${p.description}`;
    }).join('\n\n');
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          productsContext: getProductsContextString()
        })
      });

      if (!response.ok) {
        throw new Error('Connection to sub-space neural link broken.');
      }

      const data = await response.json();
      
      // Look for any products in our catalog mentioned by Rufus, so we can suggest them
      const mentionedProductIds: string[] = [];
      const normalizedResponse = data.text.toLowerCase();
      products.forEach(p => {
        const titleWords = p.title.toLowerCase().split(' ');
        const matchesTitle = titleWords.some(w => w.length > 3 && normalizedResponse.includes(w));
        if (normalizedResponse.includes(p.id) || matchesTitle) {
          mentionedProductIds.push(p.id);
        }
      });

      const rufusMsg: ChatMessage = {
        id: `ruf-${Date.now()}`,
        sender: 'rufus',
        text: data.text,
        timestamp: new Date(),
        suggestedProducts: mentionedProductIds.length > 0 ? mentionedProductIds : undefined
      };

      setMessages(prev => [...prev, rufusMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'rufus',
        text: "Apologies, captain! My sensory networks encountered minor cosmic interference. Please double-check your workspace setup, or try again shortly.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const suggestedQuestions = [
    "Tell me about the Sero Smart Ring Active",
    "What deals are active today?",
    "Arriving today package tracking and status",
    "Compare Space One Pro and Apple AirPods Max"
  ];

  return (
    <div 
      id="rufus-assistant-panel" 
      className="fixed inset-y-0 right-0 w-full sm:w-112 bg-[#0a0a0a]/98 backdrop-blur-xl border-l border-white/5 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-350 ease-out"
    >
      {/* Header section */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#121212] relative">
        {/* Gold corner elements */}
        <div className="absolute top-[1px] left-[1px] w-3.5 h-3.5 border-t border-l border-[#c1a35f]" />
        
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-none bg-[#c1a35f] text-black font-semibold text-xs shadow-md">
            AI
          </div>
          <div className="text-left">
            <h3 className="text-xs uppercase tracking-[0.15em] font-extrabold text-white font-display flex items-center gap-1.5">
              Aurelian Advisor
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-none text-[8px] font-bold bg-white/5 text-[#c1a35f] border border-[#c1a35f]/20 font-mono animate-pulse">
                LIVE
              </span>
            </h3>
            <p className="text-[9px] uppercase tracking-wider text-emerald-400 font-mono font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-ping inline-block" />
              Fully Connected
            </p>
          </div>
        </div>
        <button 
          id="close-rufus-btn"
          onClick={onClose} 
          className="p-1.5 rounded-none hover:bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
        {messages.map((msg) => {
          const isRufus = msg.sender === 'rufus';
          return (
            <div 
              key={msg.id}
              className={`flex gap-3 max-w-[88%] ${isRufus ? 'mr-auto text-left' : 'ml-auto flex-row-reverse text-right'}`}
            >
              {/* Avatar indicator */}
              <div className={`w-7 h-7 rounded-none shrink-0 flex items-center justify-center text-[11px] uppercase ${
                isRufus 
                  ? 'bg-[#c1a35f] text-black' 
                  : 'bg-zinc-800 text-[#f5f2ed] border border-white/10'
              }`}>
                {isRufus ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>

              {/* Text cloud bubble */}
              <div className="space-y-3">
                <div className={`px-4 py-3 rounded-none text-xs leading-relaxed border transition-all ${
                  isRufus 
                    ? 'bg-[#121212] text-[#f5f2ed] border-white/5' 
                    : 'bg-[#c1a35f]/10 text-[#f5f2ed] border-[#c1a35f]/20'
                }`}>
                  <p className="whitespace-pre-line font-sans">{msg.text}</p>
                  
                  {/* Subtle timestamp line */}
                  <div className="mt-1.5 text-[9px] text-zinc-500 font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Grounded Recommended product cards inside Chat */}
                {isRufus && msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div className="mt-2.5 space-y-2 animate-in slide-in-from-bottom duration-200">
                    <div className="text-[9px] text-[#c1a35f] font-bold font-mono tracking-wider uppercase flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5" /> Grounded Archive Suggestions:
                    </div>
                    {msg.suggestedProducts.map(prodId => {
                      const prod = products.find(p => p.id === prodId);
                      if (!prod) return null;
                      return (
                        <div 
                          key={prodId}
                          className="p-3 rounded-none bg-[#141414] border border-white/5 flex items-center gap-3 hover:border-[#c1a35f]/30 transition-all cursor-pointer group"
                        >
                          <img 
                            src={prod.imageUrl} 
                            alt={prod.title} 
                            className="w-11 h-11 rounded-none object-cover border border-white/10"
                          />
                          <div className="flex-1 min-w-0" onClick={() => onSelectProduct(prod)}>
                            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider truncate group-hover:text-[#c1a35f] transition-colors">{prod.title}</h4>
                            <p className="text-[10px] text-zinc-400 capitalize">{prod.category}</p>
                            <span className="font-mono text-xs font-black text-[#c1a35f]">${prod.price.toFixed(2)}</span>
                          </div>
                          <button 
                            id={`rufus-add-to-cart-${prod.id}`}
                            onClick={() => onAddToCart(prod)}
                            className="p-2 rounded-none bg-[#c1a35f]/10 text-[#c1a35f] hover:bg-[#c1a35f] hover:text-black transition-colors border border-[#c1a35f]/30"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-[80%] mr-auto">
            <div className="w-7 h-7 rounded-none shrink-0 flex items-center justify-center bg-[#c1a35f] text-black">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-none bg-[#121212] text-zinc-400 border border-white/5 text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-mono">
              CURATING DATA
              <span className="flex gap-1">
                <span className="w-1 h-1 bg-[#c1a35f] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-[#c1a35f] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-[#c1a35f] rounded-full animate-bounce" />
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Section */}
      <div className="px-5 py-2.5 bg-[#0d0d0d] border-t border-white/5 overflow-x-auto no-scrollbar flex gap-2.5">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(q)}
            className="shrink-0 text-[10px] text-zinc-300 hover:text-white hover:border-[#c1a35f]/50 bg-[#161616] border border-white/5 px-3 py-1.5 rounded-none uppercase tracking-wider transition-all cursor-pointer font-sans"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Footer Text Box */}
      <form onSubmit={handleFormSubmit} className="p-4 border-t border-white/5 bg-[#0a0a0a]">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ask Rufus anything on curated collections..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            className="w-full pl-4 pr-12 py-3 rounded-none text-xs bg-[#121212] text-zinc-100 placeholder-zinc-600 border border-white/10 focus:outline-none focus:border-[#c1a35f] focus:ring-1 focus:ring-[#c1a35f]/30 transition-all font-sans"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className={`absolute right-2 px-3 py-1.5 rounded-none bg-[#c1a35f] text-black font-bold transition-all ${
              !inputValue.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="mt-2 text-[9px] text-zinc-500 text-center font-sans tracking-wide uppercase uppercase">
          Continuous smart telemetry grounds advisor suggestions.
        </p>
      </form>
    </div>
  );
}
