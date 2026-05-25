import { Sun, Snowflake, Mountain, Compass, Palmtree, Map as MapIcon, Castle, Coffee, Tent, TreePine } from 'lucide-react'

export const destinationsData = [
  {
    id: 1,
    name: 'Goa',
    type: 'Beaches & Nightlife',
    desc: 'Cruise along the sun-kissed beaches in a convertible. The perfect getaway for the weekend.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Palmtree,
    popular: true,
    bestTime: 'Nov - Feb',
    terrain: 'Coastal & Narrow Roads',
    idealCar: 'Convertible / Hatchback',
    culture: {
      desc: 'A beautiful blend of Indian and Portuguese cultures, famous for its Susegad (laid-back) lifestyle, vibrant carnivals, and exquisite seafood. Goa is where time slows down and life is celebrated.',
      image: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Baga & Calangute Beach', desc: 'Vibrant nightlife, bustling beach shacks, and water sports.', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Dudhsagar Waterfalls', desc: 'A scenic off-road drive to India’s tallest cascading waterfalls.', image: 'https://images.unsplash.com/photo-1620025988166-4e50eb19c235?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Chapora Fort', desc: 'Iconic spot for stunning sunset drives and panoramic ocean views.', image: 'https://images.unsplash.com/photo-1572508544521-3bd73e65b75a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: '3-Day Coastal Drive',
      desc: 'Start from North Goa exploring forts, drive down through the capital Panaji, and end up in the serene and pristine beaches of South Goa.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'Coastal roads are smooth but narrow. Watch out for two-wheelers. Perfect for top-down driving!',
    proTips: [
      'Rent a smaller car to easily navigate the narrow alleys of Fontainhas.',
      'Always carry cash for local beach shacks.',
      'Avoid driving on the sand; it\'s illegal and you will get stuck.'
    ],
    coords: { lat: 15.2993, lon: 74.1240, zoom: 11 },
    mapSpots: [
      { name: 'Baga Beach', lat: 15.5560, lon: 73.7515 },
      { name: 'Dudhsagar Falls', lat: 15.3143, lon: 74.3146 },
      { name: 'Chapora Fort', lat: 15.6040, lon: 73.7386 }
    ]
  },
  {
    id: 2,
    name: 'Ladakh',
    type: 'Mountain Expedition',
    desc: 'Conquer the rugged terrains with our premium 4x4 SUVs. An adventure of a lifetime.',
    image: 'https://images.unsplash.com/photo-1580979504683-16a22452c938?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Mountain,
    popular: true,
    bestTime: 'May - Sep',
    terrain: 'Rugged & Off-Road',
    idealCar: '4x4 SUV (Thar / Fortuner)',
    culture: {
      desc: 'Deeply influenced by Tibetan Buddhism. The landscape is dotted with ancient monasteries, prayer flags fluttering in the wind, and a resilient, warm-hearted local population.',
      image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Pangong Lake', desc: 'A mesmerizing high-altitude lake with ever-changing colors.', image: 'https://images.unsplash.com/photo-1581793745862-f9f4c1c9c7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Khardung La Pass', desc: 'Drive through one of the highest motorable roads in the world.', image: 'https://images.unsplash.com/photo-1580979504683-16a22452c938?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Nubra Valley', desc: 'Famous for its sand dunes and double-humped camels.', image: 'https://images.unsplash.com/photo-1613904985222-0d534430bdbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: '7-Day High Altitude Circuit',
      desc: 'Leh acclimatization -> Nubra Valley via Khardung La -> Pangong Lake via Shyok -> Return to Leh.',
      image: 'https://images.unsplash.com/photo-1533587851505-d119e13bf0b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'Carry extra fuel and emergency kits. 4x4 engagement is necessary for high passes and water crossings.',
    proTips: [
      'Acclimatize in Leh for at least 48 hours before driving higher.',
      'Check Inner Line Permits before starting your drive.',
      'Water crossings are shallow in the morning but deep in the afternoon. Plan accordingly.'
    ],
    coords: { lat: 34.1526, lon: 77.5770, zoom: 10 },
    mapSpots: [
      { name: 'Pangong Lake', lat: 33.7580, lon: 78.6716 },
      { name: 'Khardung La Pass', lat: 34.2805, lon: 77.6038 },
      { name: 'Nubra Valley', lat: 34.6730, lon: 77.5545 }
    ]
  },
  {
    id: 3,
    name: 'Jaipur',
    type: 'Heritage Drive',
    desc: 'Explore the pink city in style. Rent a luxury sedan for a royal experience.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Compass,
    popular: true,
    bestTime: 'Oct - Mar',
    terrain: 'City Roads & Highways',
    idealCar: 'Luxury Sedan',
    culture: {
      desc: 'The vibrant capital of Rajasthan, known as the Pink City. It boasts a rich Rajputana heritage, magnificent palaces, bustling bazaars, and traditional Rajasthani cuisine.',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Amer Fort', desc: 'Majestic hilltop fort with a brilliant elephant pathway.', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Hawa Mahal', desc: 'The iconic Palace of Winds right in the city center.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Nahargarh Fort', desc: 'Offers the best panoramic view of the entire city, especially at night.', image: 'https://images.unsplash.com/photo-1558500201-d85c85d852a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: '2-Day Royal Trail',
      desc: 'Day 1: City Palace, Jantar Mantar, and Hawa Mahal. Day 2: Morning drive to Amer Fort and sunset at Nahargarh.',
      image: 'https://images.unsplash.com/photo-1580828343064-fde4cad20610?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The highway from Delhi/Agra is excellent. Within the old city, traffic can be dense, so a comfortable automatic sedan is recommended.',
    proTips: [
      'Park your car outside the walled city to avoid heavy market traffic.',
      'Visit Amer Fort early in the morning for a peaceful drive and great photos.',
      'Try the local Laal Maas, but keep bottled water handy!'
    ],
    coords: { lat: 26.9124, lon: 75.7873, zoom: 12 },
    mapSpots: [
      { name: 'Amer Fort', lat: 26.9855, lon: 75.8513 },
      { name: 'Hawa Mahal', lat: 26.9239, lon: 75.8267 },
      { name: 'Nahargarh Fort', lat: 26.9316, lon: 75.8045 }
    ]
  },
  {
    id: 4,
    name: 'Manali',
    type: 'Snow & Valley',
    desc: 'Drive through the snowy peaks. We provide snow-chain equipped vehicles for safety.',
    image: 'https://images.unsplash.com/photo-1605649487212-4d4b1a4cb9fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Snowflake,
    popular: false,
    bestTime: 'Dec - Feb (Snow) / Apr - Jun',
    terrain: 'Hilly & Winding',
    idealCar: 'Compact SUV (Creta / Nexon)',
    culture: {
      desc: 'A serene valley town reflecting Himachali culture with its wooden temples, apple orchards, and a mix of adventure sports and spiritual retreats.',
      image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Rohtang Pass', desc: 'A spectacular drive through snow-capped mountains.', image: 'https://images.unsplash.com/photo-1605649487212-4d4b1a4cb9fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Solang Valley', desc: 'The hub for adventure sports and stunning valley views.', image: 'https://images.unsplash.com/photo-1623307555319-3c35fce87495?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Atal Tunnel', desc: 'An engineering marvel offering a smooth, scenic drive to Lahaul.', image: 'https://images.unsplash.com/photo-1593364871904-ce444ceb9ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: '4-Day Valley Escape',
      desc: 'Explore Old Manali cafes, drive to Solang Valley for activities, cross the Atal Tunnel to Sissu, and conquer Rohtang Pass.',
      image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'Maintain low gears on descents. If traveling in winter, request a vehicle with snow chains and an experienced driver.',
    proTips: [
      'Engine braking is your best friend on steep downhills; do not ride the brakes.',
      'Check weather alerts daily; roads can close suddenly due to snowfall.',
      'Start your drives early to avoid tourist traffic jams towards Solang.'
    ],
    coords: { lat: 32.2432, lon: 77.1892, zoom: 11 },
    mapSpots: [
      { name: 'Rohtang Pass', lat: 32.3732, lon: 77.2430 },
      { name: 'Solang Valley', lat: 32.3213, lon: 77.1573 },
      { name: 'Atal Tunnel', lat: 32.3663, lon: 77.1851 }
    ]
  },
  {
    id: 5,
    name: 'Kerala',
    type: 'Backwaters & Greenery',
    desc: 'A smooth drive through God’s own country. Enjoy the scenic routes with our premium cars.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Sun,
    popular: false,
    bestTime: 'Sep - Mar',
    terrain: 'Lush & Winding',
    idealCar: 'Premium SUV / Sedan',
    culture: {
      desc: 'Known as God’s Own Country, Kerala offers a tranquil culture revolving around Ayurveda, backwaters, classical dances like Kathakali, and lush spice plantations.',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Munnar Tea Gardens', desc: 'Endless rolling hills covered in lush green tea plantations.', image: 'https://images.unsplash.com/photo-1593693397690-362bb9ae26a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Alleppey Backwaters', desc: 'Drive down to the coast and switch to a scenic houseboat.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Wayanad', desc: 'Forest drives, waterfalls, and exotic wildlife sightings.', image: 'https://images.unsplash.com/photo-1513415564515-763d91423bdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: '5-Day Nature Circuit',
      desc: 'Kochi -> Munnar (2 days of tea estates) -> Thekkady (wildlife) -> Alleppey (backwaters) -> Return to Kochi.',
      image: 'https://images.unsplash.com/photo-1506461883276-594c39bbec8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'Expect frequent rain showers. Roads are well-maintained but winding in the ghats. Good tires and brakes are a must.',
    proTips: [
      'Ghat roads to Munnar can be foggy; use fog lights and drive slow.',
      'Always yield to heavier vehicles on narrow mountain curves.',
      'Try the local filter coffee at roadside stops!'
    ],
    coords: { lat: 10.1632, lon: 76.6413, zoom: 8 },
    mapSpots: [
      { name: 'Munnar Tea Gardens', lat: 10.0892, lon: 77.0595 },
      { name: 'Alleppey Backwaters', lat: 9.4981, lon: 76.3388 },
      { name: 'Wayanad', lat: 11.6854, lon: 76.1320 }
    ]
  },
  {
    id: 6,
    name: 'Udaipur',
    type: 'City of Lakes',
    desc: 'Experience the romantic city of lakes with a comfortable and luxurious ride.',
    image: 'https://images.unsplash.com/photo-1615836245337-f8b9d113cb3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Compass,
    popular: true,
    bestTime: 'Sep - Mar',
    terrain: 'Urban & Lakeside',
    idealCar: 'Luxury SUV',
    culture: {
      desc: 'The Venice of the East. A deeply romantic city characterized by pristine lakes, grand Mewar palaces, and a calm, royal ambiance.',
      image: 'https://images.unsplash.com/photo-1615836245337-f8b9d113cb3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'City Palace', desc: 'A monumental complex of 11 palaces, courtyards, and gardens.', image: 'https://images.unsplash.com/photo-1591823906233-a3d2e9643444?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Lake Pichola', desc: 'Drive around the lake at sunset for incredible reflections.', image: 'https://images.unsplash.com/photo-1582236266395-9ffdc3885a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Sajjangarh (Monsoon Palace)', desc: 'A steep, winding drive up the hill for majestic twilight views.', image: 'https://images.unsplash.com/photo-1559092476-88ab196ddc86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Romantic Weekend Getaway',
      desc: 'Morning at City Palace, afternoon drive to Sajjangarh for sunset, and dinner by Fateh Sagar Lake.',
      image: 'https://images.unsplash.com/photo-1603504147775-6f6fdbab51f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The old city has very narrow lanes. Park your vehicle at the hotel and explore on foot, or stick to the wider lakeside roads.',
    proTips: [
      'Take a drive on the Rani Road alongside Fateh Sagar Lake early morning.',
      'Many hotels in the old city don’t have parking; check beforehand.',
      'The drive to Kumbhalgarh Fort (2 hours away) makes for an epic day trip.'
    ]
  },
  {
    id: 7,
    name: 'Agra',
    type: 'Historical Heritage',
    desc: 'Drive to the city of the Taj. Smooth expressway driving meets majestic Mughal architecture.',
    image: 'https://images.unsplash.com/photo-1564507592208-0270e940e53a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Castle,
    popular: true,
    bestTime: 'Oct - Mar',
    terrain: 'Highways & City',
    idealCar: 'Sedan / SUV',
    culture: {
      desc: 'Agra is the heart of the Mughal Empire in India, known globally for the Taj Mahal, intricate marble inlay work, and delicious Petha sweet.',
      image: 'https://images.unsplash.com/photo-1564507592208-0270e940e53a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Taj Mahal', desc: 'The world-famous monument of love, beautiful at sunrise.', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Agra Fort', desc: 'A massive red sandstone fort built by the Mughal emperors.', image: 'https://images.unsplash.com/photo-1585506942812-e72b29cef752?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Fatehpur Sikri', desc: 'The deserted red sandstone city, a short drive from Agra.', image: 'https://images.unsplash.com/photo-1622308644420-b3105fe8cbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'The Mughal Trail',
      desc: 'Sunrise at Taj Mahal -> Breakfast -> Explore Agra Fort -> Afternoon drive to Fatehpur Sikri.',
      image: 'https://images.unsplash.com/photo-1564507592208-0270e940e53a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The Yamuna Expressway from Delhi is fantastic. Use cruise control but stay alert for sudden speed cameras.',
    proTips: [
      'Vehicles are not allowed right up to the Taj Mahal; use the designated parking lots.',
      'Beware of unauthorized guides at monuments.',
      'Try the legendary Bedai and Jalebi for breakfast.'
    ],
    coords: { lat: 27.1767, lon: 78.0081, zoom: 13 },
    mapSpots: [
      { name: 'Taj Mahal', lat: 27.1751, lon: 78.0421 },
      { name: 'Agra Fort', lat: 27.1800, lon: 78.0219 },
      { name: 'Fatehpur Sikri', lat: 27.0945, lon: 77.6659 }
    ]
  },
  {
    id: 8,
    name: 'Varanasi',
    type: 'Spiritual Center',
    desc: 'The spiritual heart of India. Best reached by a comfortable road trip before exploring on foot.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Compass,
    popular: false,
    bestTime: 'Oct - Mar',
    terrain: 'Crowded Urban',
    idealCar: 'Compact / Sedan',
    culture: {
      desc: 'One of the oldest continuously inhabited cities in the world. Famous for its Ghats, Ganga Aarti, spirituality, and silk weaving.',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Dashashwamedh Ghat', desc: 'The main ghat, famous for the spectacular evening Ganga Aarti.', image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Kashi Vishwanath Temple', desc: 'One of the most famous Hindu temples dedicated to Lord Shiva.', image: 'https://images.unsplash.com/photo-1624505373809-b684dfad8d56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Sarnath', desc: 'A short drive away, where Buddha gave his first sermon.', image: 'https://images.unsplash.com/photo-1582236266395-9ffdc3885a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Spiritual Awakening',
      desc: 'Morning boat ride -> Temple visits -> Afternoon drive to Sarnath -> Evening Ganga Aarti.',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The city center near the Ghats is completely car-free. Park your vehicle at a secure spot slightly far from the Ghats.',
    proTips: [
      'Take a morning boat ride at sunrise for the best views of the Ghats.',
      'Navigating the narrow alleys (galis) is part of the experience, walk carefully.',
      'Taste the famous Banarasi Paan and Malaiyyo.'
    ]
  },
  {
    id: 9,
    name: 'Darjeeling',
    type: 'Hill Station',
    desc: 'Navigate the winding roads to the Queen of the Hills. Enjoy tea gardens and majestic peaks.',
    image: 'https://images.unsplash.com/photo-1544634076-a90160ddf44e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: TreePine,
    popular: false,
    bestTime: 'Mar - May / Oct - Dec',
    terrain: 'Steep Hilly Roads',
    idealCar: 'Compact SUV',
    culture: {
      desc: 'A charming hill station known for its world-class tea, the Toy Train, colonial architecture, and breathtaking views of Mt. Kanchenjunga.',
      image: 'https://images.unsplash.com/photo-1544634076-a90160ddf44e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Tiger Hill', desc: 'Drive up early to witness a stunning sunrise over Kanchenjunga.', image: 'https://images.unsplash.com/photo-1544634076-a90160ddf44e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Batasia Loop', desc: 'A spiral railway track where the Toy Train takes a 360-degree turn.', image: 'https://images.unsplash.com/photo-1625400262141-860e6e737158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Happy Valley Tea Estate', desc: 'Lush green tea gardens offering guided tours and fresh brews.', image: 'https://images.unsplash.com/photo-1593693397690-362bb9ae26a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Himalayan Tea Trail',
      desc: 'Sunrise at Tiger Hill -> Breakfast in town -> Toy train ride -> Afternoon tea estate visit.',
      image: 'https://images.unsplash.com/photo-1625400262141-860e6e737158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'Roads from Siliguri are steep and can be foggy. Keep your horn active on blind curves.',
    proTips: [
      'Start the drive to Tiger Hill by 4 AM to secure a good spot.',
      'Purchase tea directly from the estates for the best quality.',
      'Dress in layers; weather can change rapidly.'
    ]
  },
  {
    id: 10,
    name: 'Rishikesh',
    type: 'Yoga & Adventure',
    desc: 'Drive up to the yoga capital of the world. Great for river rafting and spiritual retreats.',
    image: 'https://images.unsplash.com/photo-1591507421396-857a2b978b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Tent,
    popular: true,
    bestTime: 'Sep - Nov / Feb - Apr',
    terrain: 'Hilly & Highway',
    idealCar: 'SUV / Hatchback',
    culture: {
      desc: 'Nestled in the Himalayan foothills beside the Ganges. It is a hub for yoga, meditation, spirituality, and thrilling white-water rafting.',
      image: 'https://images.unsplash.com/photo-1591507421396-857a2b978b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Laxman Jhula', desc: 'An iconic suspension bridge offering great views of the Ganges.', image: 'https://images.unsplash.com/photo-1591507421396-857a2b978b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Triveni Ghat', desc: 'The most sacred bathing spot, famous for its evening Maha Aarti.', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Shivpuri', desc: 'The starting point for exhilarating white-water rafting trips.', image: 'https://images.unsplash.com/photo-1623307555319-3c35fce87495?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Adventure & Zen',
      desc: 'Morning Yoga -> Afternoon Rafting from Shivpuri -> Evening Aarti at Triveni Ghat.',
      image: 'https://images.unsplash.com/photo-1591507421396-857a2b978b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The highway is decent, but the road up to Shivpuri is winding and often crowded with rafters. Drive cautiously.',
    proTips: [
      'Park near the outskirts and rent a two-wheeler to navigate the narrow ashram areas.',
      'Book rafting in advance during peak season.',
      'Vegetarian food only; the entire city is a holy zone.'
    ]
  },
  {
    id: 11,
    name: 'Shimla',
    type: 'Colonial Charm',
    desc: 'The classic Indian road trip to the hills. Enjoy the colonial architecture and cool breeze.',
    image: 'https://images.unsplash.com/photo-1525253013412-55c1a69a5738?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Snowflake,
    popular: false,
    bestTime: 'Mar - Jun / Nov - Jan',
    terrain: 'Hilly Highways',
    idealCar: 'Sedan / Compact SUV',
    culture: {
      desc: 'The former summer capital of British India, retaining its colonial heritage, bustling Mall Road, and scenic Himalayan backdrop.',
      image: 'https://images.unsplash.com/photo-1525253013412-55c1a69a5738?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'The Ridge & Mall Road', desc: 'The heart of Shimla, perfect for shopping and evening strolls.', image: 'https://images.unsplash.com/photo-1525253013412-55c1a69a5738?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Jakhu Temple', desc: 'An ancient temple dedicated to Lord Hanuman, located on Shimla’s highest peak.', image: 'https://images.unsplash.com/photo-1622308644420-b3105fe8cbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Kufri', desc: 'A short drive from Shimla, known for its scenic beauty and winter sports.', image: 'https://images.unsplash.com/photo-1605649487212-4d4b1a4cb9fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Colonial Hill Retreat',
      desc: 'Walk the Mall Road -> Hike to Jakhu Temple -> Day trip drive to Kufri.',
      image: 'https://images.unsplash.com/photo-1525253013412-55c1a69a5738?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The Himalayan Expressway makes the drive smooth, but hill driving rules apply: uphill traffic has the right of way.',
    proTips: [
      'Vehicles are strictly prohibited on Mall Road and The Ridge.',
      'Use the public lifts to reach Mall Road from Cart Road.',
      'Beware of the very mischievous monkeys at Jakhu Temple!'
    ]
  },
  {
    id: 12,
    name: 'Mysore',
    type: 'Palace City',
    desc: 'A smooth drive from Bangalore into the city of palaces, silk, and sandalwood.',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f41cb822?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Castle,
    popular: false,
    bestTime: 'Oct - Feb',
    terrain: 'Expressway & City',
    idealCar: 'Sedan / Hatchback',
    culture: {
      desc: 'The cultural capital of Karnataka. Famous for its magnificent palaces, Dasara festival, Mysore Pak sweet, and rich heritage of art.',
      image: 'https://images.unsplash.com/photo-1600100397608-f010f41cb822?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Mysore Palace', desc: 'One of India’s grandest royal buildings, spectacularly lit at night.', image: 'https://images.unsplash.com/photo-1600100397608-f010f41cb822?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Chamundi Hill', desc: 'A scenic drive up the hill to visit the ancient Chamundeshwari Temple.', image: 'https://images.unsplash.com/photo-1582236266395-9ffdc3885a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Brindavan Gardens', desc: 'Famous for its musical fountain show and symmetric design.', image: 'https://images.unsplash.com/photo-1593693397690-362bb9ae26a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Heritage Royal Tour',
      desc: 'Morning at Mysore Palace -> Afternoon drive up Chamundi Hill -> Evening at Brindavan Gardens.',
      image: 'https://images.unsplash.com/photo-1600100397608-f010f41cb822?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The new Bengaluru-Mysuru Expressway makes it a fast 2-hour drive. Great roads overall.',
    proTips: [
      'Visit the palace on Sunday evening or public holidays to see it illuminated with 100,000 bulbs.',
      'Buy authentic silk from government emporiums.',
      'Try the original Mysore Pak at Guru Sweets.'
    ]
  },
  {
    id: 13,
    name: 'Hampi',
    type: 'Historical Ruins',
    desc: 'Drive into an ancient world. The boulder-strewn landscape is unlike anything else in India.',
    image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Compass,
    popular: false,
    bestTime: 'Oct - Feb',
    terrain: 'Rural Highways',
    idealCar: 'SUV',
    culture: {
      desc: 'A UNESCO World Heritage Site. The ruins of the Vijayanagara Empire are set against a surreal landscape of giant boulders and banana plantations.',
      image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Virupaksha Temple', desc: 'The main working temple, soaring high above the ruins.', image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Vittala Temple (Stone Chariot)', desc: 'The iconic stone chariot and musical pillars.', image: 'https://images.unsplash.com/photo-1622308644420-b3105fe8cbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Matanga Hill', desc: 'Hike up for a breathtaking panoramic view of the ruins at sunrise.', image: 'https://images.unsplash.com/photo-1582236266395-9ffdc3885a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Ruins & Boulders',
      desc: 'Sunrise at Matanga Hill -> Explore the Royal Enclosure -> Sunset at Hemakuta Hill.',
      image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'Roads approaching Hampi can be patchy. An SUV is recommended for comfort over rural roads.',
    proTips: [
      'Rent a bicycle or moped locally to explore the ruins up close.',
      'Carry plenty of water and wear good walking shoes.',
      'Catch the sunset from Hemakuta Hill or Monkey Temple.'
    ]
  },
  {
    id: 14,
    name: 'Ooty',
    type: 'Queen of Hills',
    desc: 'The classic South Indian hill station drive through the 36 hairpin bends.',
    image: 'https://images.unsplash.com/photo-1589181165251-512140bbdff9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: TreePine,
    popular: false,
    bestTime: 'Oct - Jun',
    terrain: 'Steep Hairpin Bends',
    idealCar: 'Compact SUV',
    culture: {
      desc: 'A popular colonial-era hill station known for its expansive tea gardens, the Nilgiri Mountain Railway, and homemade chocolates.',
      image: 'https://images.unsplash.com/photo-1589181165251-512140bbdff9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Ooty Lake', desc: 'A scenic artificial lake perfect for boating.', image: 'https://images.unsplash.com/photo-1589181165251-512140bbdff9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Botanical Gardens', desc: 'A lush, historic garden featuring a fossilized tree trunk.', image: 'https://images.unsplash.com/photo-1593693397690-362bb9ae26a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Doddabetta Peak', desc: 'The highest peak in the Nilgiris offering stunning valley views.', image: 'https://images.unsplash.com/photo-1544634076-a90160ddf44e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Nilgiri Escape',
      desc: 'Drive up via Kalhatty -> Ooty Lake boating -> Botanical gardens -> Sunset at Doddabetta.',
      image: 'https://images.unsplash.com/photo-1589181165251-512140bbdff9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The Kalhatty route has 36 steep hairpin bends. Use lower gears aggressively to prevent brake fade.',
    proTips: [
      'Take the Coonoor route if you prefer a longer but less steep drive.',
      'Buy homemade chocolates and Nilgiri tea from local shops.',
      'Book a ride on the Toy Train from Coonoor to Ooty.'
    ]
  },
  {
    id: 15,
    name: 'Coorg',
    type: 'Scotland of India',
    desc: 'Drive through misty coffee plantations and spice estates.',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Coffee,
    popular: false,
    bestTime: 'Oct - Mar',
    terrain: 'Lush Hilly Roads',
    idealCar: 'SUV / Sedan',
    culture: {
      desc: 'Known for its distinct Kodava culture, endless coffee estates, martial traditions, and the delicious Pandi (pork) curry.',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Abbey Falls', desc: 'A beautiful cascade nestled amid coffee plantations.', image: 'https://images.unsplash.com/photo-1620025988166-4e50eb19c235?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Raja’s Seat', desc: 'A seasonal garden offering spectacular sunset views over the valleys.', image: 'https://images.unsplash.com/photo-1582236266395-9ffdc3885a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Dubare Elephant Camp', desc: 'An interactive camp where you can watch elephants bathe in the river.', image: 'https://images.unsplash.com/photo-1593693397690-362bb9ae26a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Coffee & Nature Tour',
      desc: 'Morning at Dubare -> Afternoon at Abbey Falls -> Evening sunset from Raja’s Seat.',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The roads from Mysore/Bangalore are mostly good but can get narrow and winding closer to Madikeri.',
    proTips: [
      'Stay in a coffee estate homestay for an authentic experience.',
      'Purchase local coffee powder, honey, and spices.',
      'Respect the local wildlife; drive carefully through forested areas.'
    ]
  },
  {
    id: 16,
    name: 'Pondicherry',
    type: 'French Riviera',
    desc: 'A scenic drive down the East Coast Road to a slice of France in India.',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Palmtree,
    popular: false,
    bestTime: 'Oct - Mar',
    terrain: 'Smooth Coastal Highway',
    idealCar: 'Hatchback / Convertible',
    culture: {
      desc: 'A former French colony, characterized by vibrant mustard-yellow colonial villas, chic boutiques, and the spiritual aura of Auroville.',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Promenade Beach', desc: 'A long, rocky beachside promenade perfect for an evening walk.', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Auroville (Matrimandir)', desc: 'An experimental township dedicated to human unity.', image: 'https://images.unsplash.com/photo-1582236266395-9ffdc3885a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'White Town', desc: 'The French quarter, famous for its architecture and cafes.', image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'French Heritage Drive',
      desc: 'Drive down the ECR from Chennai -> Explore White Town cafes -> Visit Auroville.',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The East Coast Road (ECR) from Chennai is highly scenic and smooth. Great for a relaxed cruise.',
    proTips: [
      'Rent a bicycle to explore White Town easily.',
      'Book a visit to the inner chamber of Matrimandir days in advance.',
      'Enjoy authentic French pastries at local bakeries.'
    ]
  },
  {
    id: 17,
    name: 'Jaisalmer',
    type: 'Desert Safari',
    desc: 'Drive into the heart of the Thar Desert. Perfect for SUVs and off-roading.',
    image: 'https://images.unsplash.com/photo-1580828343064-fde4cad20610?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Compass,
    popular: false,
    bestTime: 'Nov - Mar',
    terrain: 'Desert Highways',
    idealCar: 'SUV (4x4 preferred)',
    culture: {
      desc: 'The Golden City, known for its yellow sandstone architecture, the living Jaisalmer Fort, and the majestic sand dunes of the Thar.',
      image: 'https://images.unsplash.com/photo-1580828343064-fde4cad20610?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Jaisalmer Fort', desc: 'One of the few "living forts" in the world, glowing golden at sunset.', image: 'https://images.unsplash.com/photo-1580828343064-fde4cad20610?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Sam Sand Dunes', desc: 'The best spot for camel safaris and dune bashing.', image: 'https://images.unsplash.com/photo-1613904985222-0d534430bdbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Gadisar Lake', desc: 'A historic man-made lake surrounded by temples and ghats.', image: 'https://images.unsplash.com/photo-1582236266395-9ffdc3885a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Golden Desert Adventure',
      desc: 'Explore the fort -> Afternoon drive to Sam Dunes for sunset -> Evening cultural camp.',
      image: 'https://images.unsplash.com/photo-1580828343064-fde4cad20610?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The highway from Jodhpur is a fantastic straight stretch, but watch out for cattle and sudden sand drifts.',
    proTips: [
      'Take your SUV dune bashing, but only if you lower tire pressure and have a guide.',
      'Stay overnight in a desert camp for an incredible stargazing experience.',
      'Drink plenty of water; the dry desert air can be deceptive.'
    ]
  },
  {
    id: 18,
    name: 'Srinagar',
    type: 'Paradise on Earth',
    desc: 'A breathtaking drive through the valleys of Kashmir.',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Mountain,
    popular: false,
    bestTime: 'Apr - Oct',
    terrain: 'Valley & Hilly Roads',
    idealCar: 'SUV',
    culture: {
      desc: 'The summer capital of J&K, famous for its serene Dal Lake, intricate wooden houseboats, Mughal gardens, and Kashmiri handicrafts.',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Dal Lake', desc: 'The jewel of Srinagar; enjoy a peaceful Shikara ride.', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Mughal Gardens (Shalimar Bagh)', desc: 'Beautifully terraced gardens built by Mughal emperors.', image: 'https://images.unsplash.com/photo-1593693397690-362bb9ae26a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Gulmarg', desc: 'A stunning drive from Srinagar, famous for its gondola and skiing.', image: 'https://images.unsplash.com/photo-1605649487212-4d4b1a4cb9fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Valley of Flowers Drive',
      desc: 'Stay on a houseboat -> Explore gardens -> Day trip drive to Gulmarg or Pahalgam.',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'Roads inside the city can be congested. The highway drive to Gulmarg is scenic but requires winter driving skills if snowing.',
    proTips: [
      'Bargain politely while shopping for Pashmina or saffron.',
      'Stay in a traditional houseboat for at least one night.',
      'Enjoy traditional Kashmiri Wazwan cuisine.'
    ]
  },
  {
    id: 19,
    name: 'Shillong',
    type: 'Scotland of the East',
    desc: 'Navigate the misty hills and waterfalls of Meghalaya.',
    image: 'https://images.unsplash.com/photo-1629837599052-9bc507222384?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: TreePine,
    popular: false,
    bestTime: 'Sep - May',
    terrain: 'Hilly & Wet Roads',
    idealCar: 'SUV',
    culture: {
      desc: 'The capital of Meghalaya. It boasts a distinct rock-music culture, colonial-era charm, and is the gateway to the wettest places on earth.',
      image: 'https://images.unsplash.com/photo-1629837599052-9bc507222384?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Umiam Lake', desc: 'A stunning man-made reservoir offering water sports and great views.', image: 'https://images.unsplash.com/photo-1629837599052-9bc507222384?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Elephant Falls', desc: 'A popular multi-tiered waterfall just outside the city.', image: 'https://images.unsplash.com/photo-1620025988166-4e50eb19c235?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Cherrapunji (Sohra)', desc: 'A scenic 2-hour drive to witness living root bridges and epic waterfalls.', image: 'https://images.unsplash.com/photo-1593693397690-362bb9ae26a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Meghalaya Explorer',
      desc: 'Stop at Umiam Lake -> Explore Shillong cafes -> Next day drive to Cherrapunji and Dawki.',
      image: 'https://images.unsplash.com/photo-1629837599052-9bc507222384?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'Frequent rain means roads can be very slippery. Ensure your tires have good tread and use fog lights when necessary.',
    proTips: [
      'Carry umbrellas and raincoats regardless of the season.',
      'Start your drive to Dawki early to avoid traffic.',
      'Check out the local live music scene in Shillong cafes.'
    ]
  },
  {
    id: 20,
    name: 'Nainital',
    type: 'Lake District',
    desc: 'A beautiful drive up into the Kumaon foothills surrounding a volcanic lake.',
    image: 'https://images.unsplash.com/photo-1626294717163-d021c32c4974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: Compass,
    popular: false,
    bestTime: 'Mar - Jun / Oct - Feb',
    terrain: 'Hilly & Winding',
    idealCar: 'Compact SUV',
    culture: {
      desc: 'A popular hill resort built around a mango-shaped lake. It has a rich colonial history and is home to the revered Naina Devi temple.',
      image: 'https://images.unsplash.com/photo-1626294717163-d021c32c4974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    spots: [
      { name: 'Naini Lake', desc: 'The center of the town, perfect for boating and evening walks.', image: 'https://images.unsplash.com/photo-1626294717163-d021c32c4974?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Snow View Point', desc: 'Accessible via a ropeway or a steep drive, offering views of the Himalayas.', image: 'https://images.unsplash.com/photo-1544634076-a90160ddf44e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
      { name: 'Mall Road', desc: 'The bustling street running alongside the lake, full of shops and cafes.', image: 'https://images.unsplash.com/photo-1525253013412-55c1a69a5738?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    itinerary: {
      title: 'Kumaon Lakes Drive',
      desc: 'Boating at Naini Lake -> Drive to Bhimtal and Sattal -> Enjoy the sunset from Tiffin Top.',
      image: 'https://images.unsplash.com/photo-1626294717163-d021c32c4974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    drivingTip: 'The road from Kathgodam has many blind curves. Avoid overtaking on turns and use the horn.',
    proTips: [
      'Park your car at your hotel and walk; parking near the lake is very limited.',
      'Take a day trip to explore the quieter neighboring lakes like Naukuchiatal.',
      'Buy homemade wax candles, a specialty of Nainital.'
    ]
  }
]
