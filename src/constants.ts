import { Product, Order } from './types';

export const MOCK_PRODUCTS: Product[] = [
  // RECOMMENDED
  {
    id: 'rec-soundcore',
    title: 'Soundcore Space One Pro',
    price: 199.99,
    originalPrice: 229.00,
    discount: '-13%',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 1420,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
    description: 'Ultra-advanced over-ear active noise cancelling headphones with real-time room acoustic mapping and customized neural sound profile technology built for high fidelity listening in 2030.',
    specs: {
      'Driver Unit': '40px Custom Silk Diaphragm',
      'ANC Level': 'Multimodal Adaptive 52dB',
      'Battery Life': 'Up to 60 Hours (ANC Off), 40 Hours (ANC On)',
      'Connectivity': 'Bluetooth 5.4 AuraCast & Ultra-Low Latency WL',
      'Special Features': 'AI Head-Tracking Spatial Audio, Rufus Smart Control'
    },
    isRecommended: true,
    searchContext: 'Soundcore Space One Pro premium over-ear headphones high-grade noise cancellation audio bluetooth wireless spatial tracking'
  },
  {
    id: 'rec-breville',
    title: 'Breville Barista Touch Impress',
    price: 899.95,
    originalPrice: 999.99,
    discount: '-10%',
    category: 'Home & Kitchen',
    rating: 4.9,
    reviewCount: 885,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400',
    description: 'Indulge in third wave specialty coffee with guided smart assistance. Auto tamping, intelligent milk texturing based on beverage variety, and responsive high-res OLED selection UI.',
    specs: {
      'Heating System': 'ThermoJet (3-second heat up)',
      'Tamping': 'Assisted Impress Tamping System (10kg pressure)',
      'Display': '7" Super-AMOLED interactive hub',
      'Milk Texturing': 'Auto MilQ™ with microfoam settings from 40°C to 75°C',
      'Grinder': 'Steel Baratza precision conical burr'
    },
    isRecommended: true,
    searchContext: 'Breville Barista Touch Impress automatic espresso machine coffee maker high-end grinder cafe quality latte maker'
  },
  {
    id: 'rec-sero',
    title: 'Sero Smart Ring Active',
    price: 249.00,
    originalPrice: 299.00,
    discount: '-16%',
    category: 'Wellness & Tech',
    rating: 4.7,
    reviewCount: 3340,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    description: 'The definitive discrete biometric sensor of the year. Featuring real-time VO2, body temperature monitoring, neural focus tracking and tactile control of modern smart devices.',
    specs: {
      'Material': 'Aerospace Titanium (Class 4), IP68 Waterproof (100m)',
      'Sensors': 'Optical PPG, Multichannel Bioimpedance, Galvanic Skin Response',
      'Weight': '2.4 grams (Ultra-light profile)',
      'Battery': '8 Days on single nano-induction charge',
      'Telemetry': 'Heart Rate Variability, Blood Oxygen, Focus Levels'
    },
    isRecommended: true,
    isTrending: true,
    searchContext: 'Sero Smart Ring biometric wellness health tracker wearable gold titanium Sleep activity pulse oxygen HRV'
  },

  // DISCOVER MORE WITH AI (AI PICKS / LIFESTYLE)
  {
    id: 'ai-lifestyle',
    title: 'Aethel Activewear Set',
    price: 79.99,
    category: 'Fashion',
    rating: 4.6,
    reviewCount: 221,
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=400',
    description: 'Personalized smart fiber activewear optimized for daily fitness regimes. Breathable thermal properties adjust dynamically to perspiration levels, assisting muscle recovery.',
    specs: {
      'Fabric': 'Aethel-Fiber Smart Breathable Polyester',
      'Fit': 'Athletic snug compression, zero-chafing heat sealed seams',
      'Features': 'Phase Change Material adaptive insulation',
      'Sustainability': '100% Recycled ocean plastic waste polymers'
    },
    isLifestyle: true,
    searchContext: 'Aethel Activewear high-performance running yoga set model clothing sport female style comfortable warm body'
  },
  {
    id: 'ai-foundation',
    title: 'Nebula Holographic Projector',
    price: 349.00,
    originalPrice: 450.00,
    discount: '-22%',
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 412,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
    description: 'Immersive holographic system bringing majestic, deep space projections and cinematic experiences directly to your ceiling. Perfect for sci-fi enthuasists and cosmic visual therapy.',
    specs: {
      'Technology': 'Quantum Dot Laser projection, true volumetric 3D rendering',
      'Throw Ratio': '0.2 Ultra-Short Throw wide angle',
      'Luminance': '1800 Volumetric Lumens',
      'Audio': 'Integrated 360° Harman Kardon Spatial speakers'
    },
    isSustainable: true,
    searchContext: 'Nebula Holographic Projector space galaxy astronomy sci-fi movies foundation stars'
  },
  {
    id: 'ai-sus-tech',
    title: 'AeroSolar Portable Power Hub',
    price: 189.99,
    category: 'Sustainability & Tech',
    rating: 4.8,
    reviewCount: 160,
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400',
    description: 'Compact high-efficiency solar charger and battery bank crafted in biodegradable materials. Keeps your smart devices powered indefinitely via daylight harnessing.',
    specs: {
      'Battery Capacity': '25,000mAh Solid State Lithium-Silicon',
      'Solar Panel': 'Flexible Ultra-conductive Single-Crystal Silicon panel',
      'Ports': '3x USB-C high speed Power Delivery (45W max)',
      'Shell': 'Flax-based organic polymer casing (compostable)'
    },
    isSustainable: true,
    searchContext: 'AeroSolar power bank portable charger solar green energy ecological sustainable tech'
  },
  {
    id: 'ai-trending',
    title: 'Spectral Smart Glasses 2.0',
    price: 299.00,
    originalPrice: 349.00,
    discount: '-14%',
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 940,
    imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=400',
    description: 'Sleek, eye-protection augmented eyewear with instant translation overlays, camera and integrated neural speaker systems. Designed in dark metallic charcoal finishes.',
    specs: {
      'Optics': 'Smart Waveguide lenses with fluidic tint control',
      'AR Engine': 'Qualcomm Snapdragon XR3 chipset Integration',
      'Microphone': 'Quad-mic beamforming with background filter',
      'Weight': '38g (Unisex luxury designer frame)'
    },
    isTrending: true,
    searchContext: 'Spectral Smart Glasses 2.0 futuristic eyewear head mounted display sunglasses camera smart tech stylish'
  },

  // TODAY'S DEALS
  {
    id: 'deal-soundcore-liberty',
    title: 'Soundcore Liberty 4 NC',
    price: 129.99,
    originalPrice: 179.99,
    discount: '-28%',
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 15400,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400',
    description: 'Reduce outer world noise by up to 98.5% with advanced ANC. Outstanding high resolution wireless sound and customized hearID profiles for optimal custom listening experiences.',
    specs: {
      'Audio Codec': 'LDAC, Hi-Res Wireless, AAC, SBC',
      'Driver': '11mm Custom Coaxial Acoustic Architecture',
      'Waterproof': 'IPX4 Sweating resistance',
      'Playtime': '10h Single Charge / 50h total with charging case'
    },
    isDeal: true,
    searchContext: 'Soundcore Liberty 4 NC wireless earbuds ear bluetooth noise cancelling music audio cheap deals'
  },
  {
    id: 'deal-roomba',
    title: 'iRobot Roomba Combo j7+',
    price: 269.99,
    originalPrice: 399.99,
    discount: '-33%',
    category: 'Home & Kitchen',
    rating: 4.5,
    reviewCount: 2011,
    imageUrl: 'https://images.unsplash.com/photo-1563162235-96102ee8eeef?auto=format&fit=crop&q=80&w=400',
    description: 'The first truly hands-free self-recovering robot vacuum and mop. Avoids pet waste, cables, socks and stairs while auto-emptying dust and auto-refilling clean water for up to 60 days.',
    specs: {
      'Suction Power': '10x Power-Lifting Suction relative to standard systems',
      'Mop System': 'Retractable Auto-Retract Mopping mechanism',
      'Obstacle Avoidance': 'PrecisionVision navigation mapping algorithms',
      'Base Station': 'Clean Base automatic dirt disposal hub'
    },
    isDeal: true,
    searchContext: 'iRobot Roomba Combo j7 vacuum cleaner sweeping mop home smart robot technology automatic'
  },
  {
    id: 'deal-echoshow',
    title: 'Echo Show 10 (3rd Gen)',
    price: 149.99,
    originalPrice: 249.99,
    discount: '-40%',
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 4720,
    imageUrl: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=400',
    description: 'Designed to move with you. Features a bright 10.1-inch display that automatically rotates to keep video calls, recipe steps, and smart cameras in full viewport at all times.',
    specs: {
      'Screen Size': '10.1 inches HD touch intelligence screen with automatic rotation',
      'Camera': '13MP high-grade lens with auto-framing tracking',
      'Smart Hub': 'Built-in Zigbee & Matter home protocol support',
      'Speakers': 'Dual front-firing tweeters and deep subwoofer output'
    },
    isDeal: true,
    searchContext: 'Echo Show 10 rotating desktop screen Alexa assistance smart home display premium design call'
  },
  {
    id: 'deal-owala',
    title: 'Owala FreeSip Bottle',
    price: 31.99,
    originalPrice: 39.99,
    discount: '-20%',
    category: 'Wellness & Tech',
    rating: 4.8,
    reviewCount: 22400,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400',
    description: 'The ultimate hydration bottle featuring a revolutionary patented FreeSip mouthpiece. Sip upright through the built-in straw or tilt back to chug from the wide opening.',
    specs: {
      'Volume': '24 oz insulated stainless steel vessel',
      'Insulation': 'Double-wall triple-chamber vacuum insulated cold technology',
      'Lid': 'Slam-Shut leakproof leak-proof safety button lid with carrying loop',
      'Material': 'BPA-free toxin-free premium food-grade steel'
    },
    isDeal: true,
    searchContext: 'Owala FreeSip Bottle stainless steel insulated drink cup gym hiking cycle sport water'
  },

  // KEEP SHOPPING FOR
  {
    id: 'keep-logitech',
    title: 'Logtech MX Master 4',
    price: 119.99,
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 1840,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400',
    description: 'Unprecedented speed and precision. MagSpeed electromagnetic scrolling wheel paired with silent clicks, side thumb-controls, and gesture sensor mappings.',
    specs: {
      'Sensor': 'Darkfield high precision 12,000 DPI tracking (works on glass)',
      'Battery': 'Charges via USB-C, lasts up to 90 days on 1 full charge',
      'Customization': 'Rufus smart profile sync, 7 fully-mappable keys',
      'Multi-Device': 'Easy-Switch pairing for up to 4 terminal workstations simultaneously'
    },
    searchContext: 'Logitech mouse MX Master computer accessories keyboard ergonomic scroll office designer'
  },
  {
    id: 'keep-airpods',
    title: 'Apple AirPods Max Space Gray',
    price: 549.00,
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 11200,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=400',
    description: 'A perfect balance of exhilarating high-fidelity audio and the effortless magic of Apple premium hardware. Absolute comfort fits paired with spatial sound tracking.',
    specs: {
      'Acoustic Driver': 'Custom-built dynamic transducer',
      'ANC': 'Pro-grade spatial Active Noise Cancellation / Transparency mode',
      'Headband': 'Knit-mesh canopy with acoustic memory foam ear pads',
      'Battery': '20 hours playtime with active spatial audio enabled'
    },
    searchContext: 'Apple AirPods Max space gray silver headphones original sound quality high resolution custom comfort'
  },
  {
    id: 'keep-samsung',
    title: 'Samsung 65" OLED S95D',
    price: 1599.99,
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 770,
    imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=400',
    description: 'Breathtaking pure OLED luxury with anti-glare screens. Exceptional contrast, extreme viewing angles, 144Hz variable refreshment, and immersive Dolby Atmos speaker arrays.',
    specs: {
      'Screen Technology': 'Quantum HDR OLED Plus with anti-reflection glaze',
      'Resolution': 'Ultra High Definition 120 FPS Native 4K',
      'Gaming Hub': 'Native Xbox Cloud streaming, G-Sync AMD FreeSync premium',
      'Processors': 'NQ4 AI Gen3 processor with real-time neural upscaling'
    },
    searchContext: 'Samsung OLED 65 inch display screen cinema game smart tv expanse prime video thin bezel'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-2030A99',
    orderDate: '2026-06-08',
    deliveryDate: 'Arriving Today, 1:30 PM - 3:30 PM',
    status: 'out_for_delivery',
    items: [
      {
        id: 'ordered-owala',
        title: 'Owala FreeSip Water Bottle - Coastal Gray',
        price: 31.99,
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400',
        quantity: 1
      },
      {
        id: 'ordered-notebook',
        title: 'Futuristic Carbonite Smart Journal',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400',
        quantity: 1
      }
    ],
    trackingSteps: [
      { status: 'Order Confirmed', time: '6:30 AM', completed: true },
      { status: 'Package Processed at Seattle Hub', time: '8:45 AM', completed: true },
      { status: 'Dispatched with Amazon drone "Argo-4"', time: '12:15 PM', completed: true },
      { status: 'Out for Local delivery', time: '12:45 PM', completed: true },
      { status: 'Estimated Delivery (1:45 PM)', time: 'Pending', completed: false }
    ],
    currentLocation: { lat: 47.6205, lng: -122.3493 } // Centered close to Seattle Space Needle
  }
];

export const SCHEDULED_ACTIVITIES = [
  { id: 'act-1', time: '1:30 PM - 3:30 PM', title: 'Order arriving today', desc: 'Secure drone cargo pad at balcony door 3', status: 'upcoming', type: 'delivery' },
  { id: 'act-2', time: '10:00 AM', title: 'Team sync', desc: 'Active holographic corporate alignment', status: 'completed', type: 'work' },
  { id: 'act-3', time: '6:30 PM', title: 'Gym', desc: 'Daily biometrics recalibration training session', status: 'upcoming', type: 'personal' }
];

export const DEEPLINK_NARRATIVE = `
Welcome to Amazon 2030, where predictive shopping and instant sub-orbital drone delivery meet.
Feel free to ask me (Rufus, your AI Assistant) any questions you might have about our smart product catalogs!
I can recommend items matching your wellness goals, sustainability requirements, or budget constraints.
Key features of this interface include:
- Fully interactive products with immersive specs sheets
- Ask Rufus active conversational integration with real AI responses (using Gemini 3.5 Flash!)
- Instant Drone cargo maps tracking active Seattle coordinates
- Smart shopping cart with voice checkout options
- Prime Video responsive screens playing cinematically
`;
