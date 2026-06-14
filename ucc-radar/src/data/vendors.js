export const vendors = [
  {
    id: "oraios",
    name: "Oraios",
    shortDescription: "Award-winning jollof and fried rice spot beloved across the UCC campus.",
    description:
      "Oraios has been serving mouth-watering jollof rice and fried rice to the UCC community since 2015. Renowned for their smoky, perfectly seasoned rice cooked over wood fire and rich tomato-based sauces, every plate is a celebration of flavour. Beyond rice dishes, their grilled chicken and shawarma have earned devoted regulars among students and lecturers alike. Generous portions, student-friendly pricing, and consistent quality keep the queues long and smiles wider.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    location: "Opposite the Main Gate of UCC, near the Cape Coast bus stop",
    contact: "+233 24 123 4567",
    whatsapp: "233241234567",
    rating: { rate: 4.5, count: 152 },
    menu: [
      {
        name: "Jollof Rice",
        description:
          "Smoky, perfectly seasoned jollof rice slow-cooked in rich tomato sauce, served with your choice of chicken, beef, or fish.",
        priceMin: 30,
        priceMax: 50,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
      {
        name: "Fried Rice",
        description:
          "Fluffy fried rice stir-fried with fresh vegetables, eggs, and mixed proteins for a satisfying, colourful meal.",
        priceMin: 35,
        priceMax: 55,
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
      },
      {
        name: "Chicken Shawarma",
        description:
          "Tender marinated chicken wrapped in warm flatbread with crunchy vegetables and our signature spicy sauce.",
        priceMin: 30,
        priceMax: 45,
        image:
          "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80",
      },
      {
        name: "Grilled Chicken",
        description:
          "Half or whole chicken marinated in aromatic herbs and charcoal-grilled to juicy perfection.",
        priceMin: 45,
        priceMax: 80,
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
      },
    ],
    delivery: true,
    deliveryFee: "GHS 5",
    openHours: "Mon – Sat: 7:00 AM – 9:00 PM",
    category: "continental",
    tags: ["jollof", "fried rice", "shawarma", "grilled chicken"],
    featured: true,
  },
  {
    id: "kofis-kitchen",
    name: "Kofi's Kitchen",
    shortDescription: "Wholesome Ghanaian home-cooking at prices every student can afford.",
    description:
      "Kofi's Kitchen is the campus go-to for authentic, affordable Ghanaian home cooking. Operating since 2012, Kofi and his team prepare everything fresh each morning — from waakye wrapped in local leaves to banku paired with perfectly fried tilapia. The warm, welcoming atmosphere mirrors the food: honest, hearty, and full of soul. Students on tight budgets will find full, balanced meals without breaking the bank.",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80",
    location: "Near the Student Hostel, next to Balme Library",
    contact: "+233 20 987 6543",
    whatsapp: "233209876543",
    rating: { rate: 4.2, count: 210 },
    menu: [
      {
        name: "Waakye",
        description:
          "Classic Ghanaian rice and beans dish served with spaghetti, gari, boiled egg, stew, and a choice of fish or meat.",
        priceMin: 20,
        priceMax: 40,
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",
      },
      {
        name: "Banku & Tilapia",
        description:
          "Fermented corn and cassava dough served with whole fried tilapia and spiced pepper sauce — a true Ghanaian classic.",
        priceMin: 35,
        priceMax: 55,
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
      },
      {
        name: "Jollof Rice",
        description:
          "Home-style jollof rice made with fresh tomatoes and seasoned to perfection, served with a generous portion of stew.",
        priceMin: 25,
        priceMax: 40,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
      {
        name: "Fufu & Light Soup",
        description:
          "Pounded fufu in a light but deeply flavoured palm-nut soup with your choice of goat meat, chicken, or fish.",
        priceMin: 30,
        priceMax: 50,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      },
    ],
    delivery: true,
    deliveryFee: "GHS 3",
    openHours: "Mon – Sun: 6:30 AM – 8:00 PM",
    category: "local",
    tags: ["waakye", "banku", "fufu", "jollof", "tilapia"],
    featured: true,
  },
  {
    id: "mamas-delight",
    name: "Mama's Delight",
    shortDescription: "Family-run gem serving cherished traditional Ghanaian recipes with love.",
    description:
      "Mama's Delight is a family-run business that has become a campus institution. Mama Abena and her daughters bring generations of culinary tradition to every dish, from their celebrated kontomire stew to the perfectly balanced ampesi they serve alongside it. Every recipe carries a story — passed down, refined, and prepared with genuine care. If you're looking for food that tastes like home, Mama's Delight is where you belong.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
    location: "Close to the Main Campus Cafeteria, opposite the Arts Faculty",
    contact: "+233 55 555 1234",
    whatsapp: "233555551234",
    rating: { rate: 4.7, count: 183 },
    menu: [
      {
        name: "Kontomire Stew & Ampesi",
        description:
          "Rich cocoyam leaf stew served with boiled plantain and yam — a nutritious Ghanaian staple made fresh daily.",
        priceMin: 25,
        priceMax: 40,
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
      },
      {
        name: "Red Red",
        description:
          "Spiced black-eyed bean stew simmered in palm oil, served with fried ripe plantain (kelewele) and gari.",
        priceMin: 20,
        priceMax: 35,
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",
      },
      {
        name: "Omotuo & Palm Nut Soup",
        description:
          "Soft rice balls nestled in a rich, aromatic palm nut soup with tender pieces of goat or chicken.",
        priceMin: 30,
        priceMax: 50,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      },
      {
        name: "Jollof Rice & Chicken",
        description:
          "Mama's special jollof — slow-cooked in clay pot with whole tomatoes, peppers, and garden-fresh seasoning.",
        priceMin: 32,
        priceMax: 48,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
    ],
    delivery: true,
    deliveryFee: "GHS 4",
    openHours: "Mon – Sat: 7:00 AM – 8:30 PM",
    category: "local",
    tags: ["kontomire", "ampesi", "red red", "omotuo", "palm nut soup"],
    featured: true,
  },
  {
    id: "the-grill-spot",
    name: "The Grill Spot",
    shortDescription: "Premium charcoal-grilled meats and gourmet burgers cooked to order.",
    description:
      "The Grill Spot brings the sizzle and aroma of premium BBQ to the UCC campus. Using only fresh, locally sourced meats marinated in house-crafted spice blends, every item is cooked to order over natural charcoal. Their signature burgers — stacked with fresh toppings and handmade sauces — have earned a cult following. Whether it's a casual lunch or a special evening treat, The Grill Spot delivers an elevated dining experience without the premium price tag.",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    location: "Behind the Science Block, near the Faculty of Engineering Car Park",
    contact: "+233 27 456 7890",
    whatsapp: "233274567890",
    rating: { rate: 4.3, count: 97 },
    menu: [
      {
        name: "Signature Beef Burger",
        description:
          "Double smash patty burger with aged cheddar, caramelised onions, lettuce, tomato, and our secret smoky sauce.",
        priceMin: 45,
        priceMax: 70,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
      },
      {
        name: "BBQ Chicken Wings",
        description:
          "Juicy, fall-off-the-bone chicken wings basted in our tangy BBQ glaze and served with cool dipping sauce.",
        priceMin: 35,
        priceMax: 60,
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
      },
      {
        name: "Grilled Tilapia Platter",
        description:
          "Whole tilapia expertly seasoned with herbs and lemon, grilled over charcoal and served with chips and salad.",
        priceMin: 50,
        priceMax: 80,
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
      },
      {
        name: "Mixed Grill Platter",
        description:
          "An indulgent platter featuring grilled beef skewers, chicken thighs, and spicy sausages with grilled vegetables.",
        priceMin: 70,
        priceMax: 100,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Tue – Sun: 11:00 AM – 10:00 PM",
    category: "continental",
    tags: ["burger", "grilled", "BBQ", "wings", "steak"],
    featured: true,
  },
  {
    id: "accra-bites",
    name: "Accra Bites",
    shortDescription: "Quick, tasty street-food favourites and snacks for busy campus life.",
    description:
      "Accra Bites brings the lively energy of Accra's street-food culture right to UCC campus. Fast, flavourful, and perfectly portioned for students on the move, their menu spans crispy kelewele, spiced meat pies, crunchy spring rolls, and hot-pressed sandwiches. Everything is made in small batches so it's always fresh. Whether you have five minutes between lectures or want a satisfying evening snack, Accra Bites has you covered.",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    location: "Opposite the Faculty of Social Sciences, near the Students' Union",
    contact: "+233 50 234 5678",
    whatsapp: "233502345678",
    rating: { rate: 4.0, count: 134 },
    menu: [
      {
        name: "Kelewele",
        description:
          "Spiced, deep-fried ripe plantain cubes seasoned with ginger, pepper, and cloves — the ultimate Ghanaian street snack.",
        priceMin: 10,
        priceMax: 20,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
      },
      {
        name: "Meat Pie",
        description:
          "Golden, flaky pastry shells filled with savoury spiced minced meat and vegetables, baked fresh throughout the day.",
        priceMin: 8,
        priceMax: 15,
        image:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80",
      },
      {
        name: "Spring Rolls",
        description:
          "Crispy fried spring rolls packed with seasoned chicken, carrots, and cabbage, served with sweet chilli dipping sauce.",
        priceMin: 15,
        priceMax: 25,
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
      },
      {
        name: "Club Sandwich",
        description:
          "Triple-layered toasted sandwich with grilled chicken, crispy bacon, fresh lettuce, tomato, and creamy mayo.",
        priceMin: 25,
        priceMax: 40,
        image:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
      },
    ],
    delivery: true,
    deliveryFee: "GHS 4",
    openHours: "Mon – Sun: 8:00 AM – 10:00 PM",
    category: "fast-food",
    tags: ["kelewele", "meat pie", "spring rolls", "sandwich", "snacks"],
    featured: true,
  },
  {
    id: "green-garden",
    name: "Green Garden",
    shortDescription: "Fresh smoothie bowls, salads, and herbal drinks for a healthier you.",
    description:
      "Green Garden is UCC's answer to wholesome, plant-forward eating. Founded by a nutrition graduate in 2020, the café specialises in vibrant smoothie bowls, nutrient-dense salads, freshly blended juices, and calming herbal teas. Every ingredient is sourced from local farms and prepared without artificial additives. Green Garden proves that eating clean on campus doesn't have to be bland or expensive — it can be a genuinely joyful experience.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&q=80",
    location: "Near the Botanical Gardens, opposite the Science Block",
    contact: "+233 24 777 8899",
    whatsapp: "233247778899",
    rating: { rate: 4.6, count: 88 },
    menu: [
      {
        name: "Tropical Smoothie Bowl",
        description:
          "A thick blend of mango, banana, and pineapple topped with granola, fresh fruits, coconut flakes, and chia seeds.",
        priceMin: 25,
        priceMax: 40,
        image:
          "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&q=80",
      },
      {
        name: "Garden Fresh Salad",
        description:
          "Crisp lettuce, cherry tomatoes, cucumber, avocado, and feta tossed in a lemon-herb vinaigrette.",
        priceMin: 20,
        priceMax: 35,
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
      },
      {
        name: "Sobolo (Zobo)",
        description:
          "Refreshing chilled hibiscus flower drink infused with ginger, cloves, and a hint of pineapple juice.",
        priceMin: 8,
        priceMax: 15,
        image:
          "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80",
      },
      {
        name: "Avocado Toast",
        description:
          "Toasted whole-grain bread topped with smashed ripe avocado, poached egg, chilli flakes, and a squeeze of lime.",
        priceMin: 25,
        priceMax: 40,
        image:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Mon – Fri: 7:00 AM – 6:00 PM | Sat: 8:00 AM – 4:00 PM",
    category: "drinks",
    tags: ["smoothie", "salad", "healthy", "juices", "sobolo"],
    featured: false,
  },
  {
    id: "campus-shawarma",
    name: "Campus Shawarma",
    shortDescription: "Authentic Middle-Eastern-style shawarma and wraps made fresh to order.",
    description:
      "Campus Shawarma brings the bold, spiced flavours of the Middle East to the heart of UCC. Their shawarma meat is slow-roasted on a vertical spit, sliced thin, and stuffed into warm flatbreads with crisp vegetables, pickles, and house-made garlic sauce. Each wrap is assembled to order, ensuring maximum freshness. A firm favourite for late-night study sessions, Campus Shawarma is open later than most campus vendors.",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    location: "Near the Student Union Building, main campus",
    contact: "+233 26 333 4455",
    whatsapp: "233263334455",
    rating: { rate: 4.4, count: 119 },
    menu: [
      {
        name: "Chicken Shawarma",
        description:
          "Slow-roasted spiced chicken shaved and wrapped in flatbread with garlic sauce, pickles, tomatoes, and cabbage.",
        priceMin: 30,
        priceMax: 50,
        image:
          "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80",
      },
      {
        name: "Beef Shawarma",
        description:
          "Tender marinated beef strips wrapped in warm flatbread with tahini, fresh veggies, and chilli sauce.",
        priceMin: 35,
        priceMax: 55,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
      },
      {
        name: "Shawarma Meal Deal",
        description:
          "Your choice of shawarma + a portion of seasoned fries + a chilled soft drink — the best value combo on campus.",
        priceMin: 50,
        priceMax: 70,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
      },
      {
        name: "Loaded Chicken Wrap",
        description:
          "Grilled chicken strips, coleslaw, pepper sauce, and crispy onions rolled in a flour tortilla and pressed golden.",
        priceMin: 28,
        priceMax: 45,
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
      },
    ],
    delivery: true,
    deliveryFee: "GHS 5",
    openHours: "Mon – Sun: 10:00 AM – 11:00 PM",
    category: "continental",
    tags: ["shawarma", "wrap", "grilled", "chicken", "beef"],
    featured: false,
  },
  {
    id: "auntie-amas",
    name: "Auntie Ama's",
    shortDescription: "Legendary traditional Ghanaian dishes — banku, fufu, and kenkey done right.",
    description:
      "Auntie Ama's is a campus legend. For over a decade, Auntie Ama has been waking before dawn to ferment, pound, and prepare the finest banku, fufu, and kenkey on campus. Her soups are made from scratch using whole spices and garden-fresh vegetables, achieving depths of flavour that are impossible to replicate with shortcuts. Students, alumni, and even faculty come back time and again for that unmistakable taste of authentic Ghanaian tradition.",
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    location: "Castle Gate Area, near the UCC main entrance roundabout",
    contact: "+233 24 900 1122",
    whatsapp: "233249001122",
    rating: { rate: 4.8, count: 241 },
    menu: [
      {
        name: "Banku & Okra Stew",
        description:
          "Smooth, fermented corn-cassava dough served with rich okra stew and your choice of fish, crab, or meat.",
        priceMin: 30,
        priceMax: 50,
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
      },
      {
        name: "Fufu & Groundnut Soup",
        description:
          "Silky pounded fufu immersed in a thick, nutty groundnut soup with tender chicken and garden eggs.",
        priceMin: 35,
        priceMax: 55,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      },
      {
        name: "Kenkey & Fried Fish",
        description:
          "Fermented corn dumpling served with perfectly fried whole fish and a fiery fresh pepper sauce.",
        priceMin: 25,
        priceMax: 40,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
      {
        name: "Tuo Zaafi (TZ)",
        description:
          "Northern Ghanaian millet porridge served with a robust ayoyo leaf soup — hearty and deeply satisfying.",
        priceMin: 25,
        priceMax: 45,
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Mon – Sun: 6:00 AM – 3:00 PM",
    category: "local",
    tags: ["banku", "fufu", "kenkey", "traditional", "soup"],
    featured: false,
  },
  {
    id: "spice-route",
    name: "Spice Route",
    shortDescription: "Continental fusion cuisine blending African and international flavours.",
    description:
      "Spice Route takes diners on a flavour journey across continents — merging West African spices with continental cooking techniques to create dishes that are excitingly fresh yet deeply familiar. Their pasta dishes infuse local peppers and smoked fish into classic Italian frames, while their stir-fry plates bring a West African twist to Asian cooking. The result is a menu that rewards adventurous palates and offers something genuinely different from typical campus fare.",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    location: "New Campus, opposite the Faculty of Education",
    contact: "+233 57 444 5566",
    whatsapp: "233574445566",
    rating: { rate: 4.1, count: 76 },
    menu: [
      {
        name: "Smoked Fish Pasta",
        description:
          "Al dente spaghetti tossed with locally smoked fish, cherry tomatoes, capers, and a kick of shito chilli oil.",
        priceMin: 40,
        priceMax: 60,
        image:
          "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&q=80",
      },
      {
        name: "West African Stir Fry",
        description:
          "Wok-tossed rice noodles with chicken, garden vegetables, and a bold suya-spiced peanut sauce.",
        priceMin: 35,
        priceMax: 55,
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
      },
      {
        name: "Pepper Chicken Gratin",
        description:
          "Oven-baked chicken thighs in a creamy pepper sauce topped with melted cheese — comfort food reimagined.",
        priceMin: 50,
        priceMax: 75,
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
      },
      {
        name: "Fusion Rice Bowl",
        description:
          "Steamed basmati rice crowned with a medley of stewed black-eyed beans, plantain, and coconut curry sauce.",
        priceMin: 30,
        priceMax: 50,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
    ],
    delivery: true,
    deliveryFee: "GHS 6",
    openHours: "Mon – Sat: 11:00 AM – 9:00 PM",
    category: "continental",
    tags: ["pasta", "fusion", "stir fry", "continental", "creative"],
    featured: false,
  },
  {
    id: "the-juice-bar",
    name: "The Juice Bar",
    shortDescription: "100% fresh-squeezed juices, power smoothies, and chilled sobolo blends.",
    description:
      "The Juice Bar is the refreshment hub of UCC campus. Every glass is squeezed or blended to order from seasonal fruits sourced directly from local farmers' markets. Their power smoothie range is specially designed for students — packed with energy-boosting ingredients to fuel long study sessions. The signature sobolo blends come in original, pineapple-ginger, and baobab flavours, each bursting with antioxidants and natural goodness.",
    image:
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=800&q=80",
    location: "University Square, near the ATM kiosks and admin block",
    contact: "+233 23 111 2233",
    whatsapp: "233231112233",
    rating: { rate: 4.5, count: 108 },
    menu: [
      {
        name: "Fresh Orange Juice",
        description:
          "Pure, pulpy fresh-squeezed orange juice with no added sugar or preservatives — nature at its best.",
        priceMin: 10,
        priceMax: 20,
        image:
          "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&q=80",
      },
      {
        name: "Power Smoothie",
        description:
          "A nutrient-packed blend of banana, spinach, almond milk, oats, and honey to fuel your study sessions.",
        priceMin: 20,
        priceMax: 35,
        image:
          "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&q=80",
      },
      {
        name: "Baobab Sobolo",
        description:
          "Chilled hibiscus drink enriched with baobab powder, ginger, and a touch of honey — tangy, nutritious, refreshing.",
        priceMin: 10,
        priceMax: 18,
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
      },
      {
        name: "Tropical Fruit Blend",
        description:
          "A vibrant mix of watermelon, pineapple, mango, and mint — the ultimate thirst-quencher on a hot Cape Coast day.",
        priceMin: 15,
        priceMax: 28,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
      },
    ],
    delivery: true,
    deliveryFee: "GHS 3",
    openHours: "Mon – Sun: 7:00 AM – 8:00 PM",
    category: "drinks",
    tags: ["juice", "smoothie", "sobolo", "healthy", "fresh"],
    featured: false,
  },
  {
    id: "waakye-palace",
    name: "Waakye Palace",
    shortDescription: "Cape Coast's finest waakye — loaded, flavourful, and irresistibly satisfying.",
    description:
      "Waakye Palace is the undisputed king of waakye on the UCC campus. Their signature dish is a masterpiece of layers — perfectly cooked rice and beans, smooth gari, spaghetti, a boiled egg, and your choice of stew, all crowned with a generous portion of protein. The 'Royal Waakye' loaded platter has become something of a campus legend and regularly sells out before noon. Come early, or be prepared to wait — and agree that it was absolutely worth it.",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    location: "Off-campus, near the UCC Roundabout, Cape Coast",
    contact: "+233 54 678 9900",
    whatsapp: "233546789900",
    rating: { rate: 4.6, count: 195 },
    menu: [
      {
        name: "Royal Waakye",
        description:
          "The legendary loaded platter — waakye, spaghetti, gari, boiled egg, tomato stew, and grilled tilapia or chicken.",
        priceMin: 30,
        priceMax: 55,
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",
      },
      {
        name: "Simple Waakye",
        description:
          "Classic waakye with tomato stew, gari, and your choice of an egg or a single piece of fried fish.",
        priceMin: 18,
        priceMax: 30,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
      {
        name: "Gari Fotor",
        description:
          "Cassava flour soaked and mixed with beans, palm oil, and onions — a humble but intensely satisfying dish.",
        priceMin: 15,
        priceMax: 25,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      },
      {
        name: "Rice & Tomato Stew",
        description:
          "Fluffy boiled rice paired with a rich tomato-based stew and a choice of grilled chicken, beef, or fish.",
        priceMin: 20,
        priceMax: 38,
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Mon – Sat: 6:00 AM – 1:00 PM",
    category: "local",
    tags: ["waakye", "rice", "beans", "traditional", "loaded"],
    featured: false,
  },
  {
    id: "pizza-corner",
    name: "Pizza Corner",
    shortDescription: "Hand-stretched pizzas and authentic pasta baked fresh in a stone oven.",
    description:
      "Pizza Corner brings a slice of Italian authenticity to UCC. Their pizzas are hand-stretched, topped generously, and baked in a wood-fired stone oven for that perfect charred crust and bubbling cheese. The pasta is made fresh in-house daily, tossed in sauces ranging from classic marinara to a bold shito-infused arrabiata. Ideal for group dinners, study breaks, or anytime you want something distinctly different from the everyday campus menu.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    location: "Main Campus, near the Post-Graduate Lecture Hall Block",
    contact: "+233 30 222 3344",
    whatsapp: "233302223344",
    rating: { rate: 3.9, count: 63 },
    menu: [
      {
        name: "Margherita Pizza",
        description:
          "Classic wood-fired pizza with San Marzano tomato sauce, fresh mozzarella, and fragrant basil leaves.",
        priceMin: 45,
        priceMax: 75,
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
      },
      {
        name: "Pepperoni & Pepper Pizza",
        description:
          "Loaded pizza with spicy pepperoni, roasted peppers, chilli flakes, and a drizzle of honey for balance.",
        priceMin: 55,
        priceMax: 85,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
      },
      {
        name: "Spaghetti Bolognese",
        description:
          "Al dente spaghetti tossed in a slow-cooked beef and tomato ragu, finished with parmesan and fresh basil.",
        priceMin: 40,
        priceMax: 65,
        image:
          "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&q=80",
      },
      {
        name: "Garlic Bread",
        description:
          "Crusty stone-baked bread rubbed with roasted garlic butter and fresh parsley — the perfect side or starter.",
        priceMin: 15,
        priceMax: 25,
        image:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
      },
    ],
    delivery: true,
    deliveryFee: "GHS 7",
    openHours: "Mon – Sun: 12:00 PM – 10:00 PM",
    category: "continental",
    tags: ["pizza", "pasta", "italian", "stone oven", "garlic bread"],
    featured: false,
  },
];

export const categories = [
  { value: "all", label: "All Vendors" },
  { value: "local", label: "Local Dishes" },
  { value: "continental", label: "Continental" },
  { value: "fast-food", label: "Fast Food" },
  { value: "drinks", label: "Drinks & Juices" },
];

export const featuredVendors = vendors.filter((v) => v.featured);
