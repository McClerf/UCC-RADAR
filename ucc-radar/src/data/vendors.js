export const vendors = [
  {
    id: "algorithm-coffee-juice",
    name: "Algorithm Coffee & Juice",
    shortDescription: "Specialty coffee and freshly squeezed juices at the Senior Clubhouse.",
    description:
      "Algorithm Coffee & Juice is tucked inside the Senior Clubhouse and has quietly become one of the most beloved spots on campus. Whether you need a strong espresso before a 7 AM lecture or a cold mango juice to survive the afternoon heat, Algorithm delivers with speed and consistency. Their smoothie range is crafted from seasonal local fruits, and the baristas take real pride in every cup. The relaxed atmosphere and long opening hours make it the go-to refuelling stop from morning through to the evening.",
    image:
      "https://lh3.googleusercontent.com/place-photos/AJRVUZOR5NUxDBG_f7CfFQLjmiWmL5wYw2t7NE7W-UT5cfiYSEaDtdi5f_r17_XvMlmLGHLl8R5uKImxdIa9OsLYXQuh1t9EjWAx0iu4WSFR8lqcavwOfjgyYY44ZWjIpM1LfAOYeF9gOQkOuE14=s4800-w800-h600",
    flyer:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    location: "Senior Clubhouse, on campus",
    lat: 5.1171655,
    lng: -1.2883156,
    contact: "+233 26 129 6569",
    whatsapp: "233261296569",
    rating: { rate: 4.1, count: 244 },
    menu: [
      {
        name: "Espresso",
        description:
          "Rich, bold single-origin espresso shot pulled to perfection — the purest way to start your day on campus.",
        priceMin: 10,
        priceMax: 18,
        image:
          "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80",
      },
      {
        name: "Fresh Mango Juice",
        description:
          "Pure cold-pressed juice made from ripe Ghanaian mangoes — naturally sweet, chilled, and absolutely refreshing.",
        priceMin: 15,
        priceMax: 25,
        image:
          "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80",
      },
      {
        name: "Tropical Smoothie",
        description:
          "A blended mix of banana, pineapple, and pawpaw with a splash of ginger for a natural energy lift.",
        priceMin: 20,
        priceMax: 35,
        image:
          "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&q=80",
      },
      {
        name: "Coffee & Snack Combo",
        description:
          "Your choice of coffee paired with a freshly baked pastry or sandwich — the perfect quick campus meal.",
        priceMin: 25,
        priceMax: 45,
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Mon – Sat: 7:30 AM – 10:00 PM | Sun: 2:00 PM – 10:00 PM",
    category: "cafe",
    tags: ["coffee", "juice", "smoothie", "espresso", "drinks"],
    featured: true,
  },
  {
    id: "luban-workshop",
    name: "Luban Workshop Restaurant",
    shortDescription: "Authentic Chinese cuisine served on campus — a rare and satisfying find.",
    description:
      "Luban Workshop Restaurant is a hidden gem on the UCC campus, bringing genuine Chinese culinary tradition to Cape Coast. Part of the broader Luban Workshop cultural and skills initiative, the restaurant offers a menu of authentic stir-fry dishes, noodle soups, and rice plates prepared by cooks trained in Chinese techniques. It's a welcome departure from the usual campus fare and a chance to experience real Chinese flavours without leaving the university grounds. Note: the restaurant operates weekdays only.",
    image:
      "https://lh3.googleusercontent.com/place-photos/AJRVUZMOoDGujglCua5SsmLLX1wOBdU9futmt4TDO5s0UIfpXXXUNgdRKTfG47OLDAUIUKmIX_LtXnXEA3JTFCfwnjfsaD83rDM2ewy-DPJ4HoCjHvNNhbaEuGkWaZ8d60DdooqqC-uEGdADQse4iuTmc50BJg=s4800-w800-h600",
    flyer:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80",
    location: "On campus",
    lat: 5.1173705,
    lng: -1.285364,
    contact: "+233 20 543 8455",
    whatsapp: "233205438455",
    website: "https://lubanrestaurant.com/",
    rating: { rate: 5.0, count: 1 },
    menu: [
      {
        name: "Egg Fried Rice",
        description:
          "Wok-tossed jasmine rice with beaten eggs, spring onions, soy sauce, and a hint of sesame oil — a Chinese staple.",
        priceMin: 35,
        priceMax: 55,
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
      },
      {
        name: "Stir-Fried Noodles",
        description:
          "Silky wheat noodles tossed in a savory soy-garlic sauce with vegetables and your choice of chicken or beef.",
        priceMin: 40,
        priceMax: 60,
        image:
          "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80",
      },
      {
        name: "Sweet & Sour Chicken",
        description:
          "Crispy battered chicken pieces glazed in a tangy sweet-and-sour sauce, served with steamed rice.",
        priceMin: 45,
        priceMax: 70,
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
      },
      {
        name: "Vegetable Spring Rolls",
        description:
          "Golden fried rolls filled with seasoned cabbage, carrots, and glass noodles, served with a sweet chilli dip.",
        priceMin: 20,
        priceMax: 35,
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Mon – Fri: 11:00 AM – 5:30 PM | Weekends: Closed",
    category: "chinese",
    tags: ["chinese", "noodles", "fried rice", "stir fry", "international"],
    featured: true,
  },
  {
    id: "mega-bite",
    name: "Mega Bite",
    shortDescription: "Seriously satisfying burgers, chicken, and fast-food favourites near campus.",
    description:
      "Mega Bite lives up to its name — portions are generous, flavours are bold, and the food comes out fast. Located on School Bus Road, it's a short walk from campus and a reliable option when you want something filling without the wait. Their fried chicken is marinated overnight for depth of flavour, and the burgers are stacked with fresh toppings and house-made sauces. A lively spot with a strong local following, Mega Bite is the spot to hit when hunger calls.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    flyer:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    location: "School Bus Rd",
    lat: 5.1137033,
    lng: -1.2914627,
    contact: "+233 55 788 9478",
    whatsapp: "233557889478",
    website: "https://www.megabitefoodsgh.com/",
    rating: { rate: 5.0, count: 1 },
    menu: [
      {
        name: "Classic Beef Burger",
        description:
          "Juicy beef patty in a toasted brioche bun with lettuce, tomato, pickles, and our smoky special sauce.",
        priceMin: 40,
        priceMax: 65,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
      },
      {
        name: "Crispy Fried Chicken",
        description:
          "Overnight-marinated chicken pieces coated in a seasoned crispy crust and fried golden — perfectly juicy inside.",
        priceMin: 35,
        priceMax: 60,
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
      },
      {
        name: "Chips & Chicken",
        description:
          "A generous portion of seasoned crispy fries alongside two pieces of fried chicken — the ultimate combo.",
        priceMin: 45,
        priceMax: 70,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
      },
      {
        name: "Chicken Shawarma",
        description:
          "Spiced grilled chicken strips wrapped in warm flatbread with garlic sauce, vegetables, and chilli.",
        priceMin: 30,
        priceMax: 50,
        image:
          "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80",
      },
    ],
    delivery: true,
    deliveryFee: "GHS 5",
    openHours: "Mon – Sat: 12:00 PM – 9:00 PM | Sun: Closed",
    category: "fast_food",
    tags: ["burger", "fried chicken", "chips", "shawarma", "fast food"],
    featured: false,
  },
  {
    id: "oseikrom-fast-food",
    name: "Oseikrom Fast Food",
    shortDescription: "Round-the-clock local Ghanaian meals just outside campus in Amamoma.",
    description:
      "Oseikrom Fast Food is the one place near UCC that never closes. Whether it's a late-night study craving or an early morning hunger before the campus kitchens open, Oseikrom is there 24 hours a day. The menu centres on hearty Ghanaian staples — waakye, jollof, fried rice, and warming soups — all at prices that respect the student budget. The no-frills setup keeps things simple and efficient, which is exactly what you need at 2 AM.",
    image:
      "https://www.google.com/imgres?q=oseikrom%20fast%20food%20cape%20coast&imgurl=https%3A%2F%2Flookaside.instagram.com%2Fseo%2Fgoogle_widget%2Fcrawler%2F%3Fmedia_id%3D3657101898562259964&imgrefurl=https%3A%2F%2Fwww.instagram.com%2Foseikrom_avenue%2F&docid=SU1_RXFslCDSRM&tbnid=fDz3Id_H0NKFCM&vet=12ahUKEwjfrMLmhY2VAxU3YEEAHeRMAUYQnPAOegQIRRAA..i&w=640&h=1136&hcb=2&ved=2ahUKEwjfrMLmhY2VAxU3YEEAHeRMAUYQnPAOegQIRRAA",
    flyer:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    location: "Ayensu Rd, Amamoma",
    lat: 5.1139306,
    lng: -1.2944028,
    contact: null,
    whatsapp: null,
    rating: { rate: 2.9, count: 9 },
    menu: [
      {
        name: "Waakye",
        description:
          "Classic Ghanaian rice-and-beans dish served with tomato stew, gari, spaghetti, and your choice of protein.",
        priceMin: 18,
        priceMax: 35,
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",
      },
      {
        name: "Jollof Rice & Chicken",
        description:
          "Seasoned tomato jollof rice with a piece of fried or grilled chicken — a dependable Ghanaian classic.",
        priceMin: 25,
        priceMax: 40,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
      {
        name: "Fried Rice",
        description:
          "Stir-fried rice with vegetables and egg, served with fried chicken or fish on the side.",
        priceMin: 25,
        priceMax: 40,
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
      },
      {
        name: "Light Soup & Fufu",
        description:
          "Smooth pounded fufu served with a clear, spiced light soup with your choice of chicken, beef, or fish.",
        priceMin: 30,
        priceMax: 48,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Open 24 Hours",
    category: "fast_food",
    tags: ["waakye", "jollof", "24 hours", "local", "late night"],
    featured: false,
  },
  {
    id: "oraios-fast-foods",
    name: "Oraios Fast Foods",
    shortDescription: "Popular fast-food joint on Amamoma Chief's Palace Road with a loyal following.",
    description:
      "Oraios Fast Foods has earned a strong reputation in the Amamoma area through consistently good food and fair pricing. Their menu blends Ghanaian staples with fast-food favourites, making it versatile enough for any craving. The fried chicken is crispy and well-seasoned, the jollof rice is reliably smoky, and the portions are always satisfying. With a rating of 4.4 and a growing base of regulars, Oraios is proof that quality and affordability can absolutely go hand in hand.",
    image:
      "https://lh3.googleusercontent.com/place-photos/AJRVUZOEC9hbZIQTi53W0bFhjkejIBo9esAKiBz9naZ5ttQa55IptkaNqdoqmAm16ZIZJa69DVSLInVi0kjM_Nl5bOx2vs17ecr0WBOh2coqkMUa8hkWOx1dqLKOe4dbydYzaHKV-ZdnmYRx8qr_Ulc=s4800-w800-h600",
    flyer:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    location: "Amamoma Chief's Palace Rd",
    lat: 5.1120206,
    lng: -1.2943746,
    contact: "+233 25 737 6415",
    whatsapp: "233257376415",
    rating: { rate: 4.4, count: 28 },
    menu: [
      {
        name: "Jollof Rice & Chicken",
        description:
          "Smoky, perfectly seasoned jollof rice served with a generous piece of fried or grilled chicken.",
        priceMin: 28,
        priceMax: 45,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
      {
        name: "Fried Chicken & Chips",
        description:
          "Crispy seasoned fried chicken pieces with golden fries — a fast-food staple done right.",
        priceMin: 35,
        priceMax: 55,
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
      },
      {
        name: "Meat Pie",
        description:
          "Freshly baked golden pastry shells filled with spiced minced meat — a satisfying on-the-go snack.",
        priceMin: 8,
        priceMax: 15,
        image:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80",
      },
      {
        name: "Fried Rice Combo",
        description:
          "Stir-fried rice with vegetables and egg, served with a drink and a side of fried plantain.",
        priceMin: 35,
        priceMax: 55,
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Mon – Sat: 11:00 AM – 9:00 PM | Sun: Closed",
    category: "fast_food",
    tags: ["jollof", "fried chicken", "chips", "meat pie", "fast food"],
    featured: false,
  },
  {
    id: "chef-akwasi",
    name: "Chef Akwasi's Fast Food",
    shortDescription: "Honest, home-style Ghanaian cooking on Ayensu Road.",
    description:
      "Chef Akwasi's Fast Food is a neighbourhood staple on Ayensu Road, known for no-fuss, flavour-forward Ghanaian home cooking. Chef Akwasi keeps the menu tight and the quality consistent — each dish is prepared with the kind of care you'd expect from someone who genuinely loves to cook. Fufu, banku, and rice dishes are the backbone of the menu, each paired with soups and stews made fresh from scratch. It's the kind of place where the food tastes like it came from someone's kitchen because, in many ways, it did.",
    image:
      "https://lh3.googleusercontent.com/place-photos/AJRVUZOpf4DwBVxgMFBVev1aCJEa-Qk4fxVpQUqQFroHTV2SA4T5xsmJIzAvlybBn5V9UfkoOG5HegwlzUIbVMTlw6TFKgwD9cK9Yr_3t7R4SJLyzINqYldLHP1CaN4zmmGGi6qNmTLkgM1IP33DJaA=s4800-w800-h600",
    flyer:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    location: "Ayensu Rd",
    lat: 5.1141458,
    lng: -1.2933909,
    contact: "+233 54 277 0351",
    whatsapp: "233542770351",
    rating: { rate: 3.7, count: 3 },
    menu: [
      {
        name: "Fufu & Palm Nut Soup",
        description:
          "Silky pounded fufu served in a rich, aromatic palm nut soup with tender goat or chicken pieces.",
        priceMin: 30,
        priceMax: 50,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      },
      {
        name: "Banku & Tilapia",
        description:
          "Fermented corn and cassava dough served with perfectly fried whole tilapia and a fiery pepper sauce.",
        priceMin: 35,
        priceMax: 55,
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
      },
      {
        name: "Rice & Stew",
        description:
          "Fluffy boiled rice paired with a rich tomato and onion stew with a choice of chicken, beef, or fish.",
        priceMin: 22,
        priceMax: 38,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
      {
        name: "Waakye",
        description:
          "Akwasi's hearty waakye — rice and beans served with stew, gari, and your choice of protein.",
        priceMin: 18,
        priceMax: 32,
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Hours Not Listed — call ahead",
    category: "local",
    tags: ["fufu", "banku", "waakye", "local", "home-style"],
    featured: false,
  },
  {
    id: "taste-n-tell",
    name: "Taste N Tell",
    shortDescription: "A welcoming restaurant inside UCC Amamoma with a varied all-day menu.",
    description:
      "Taste N Tell is a firm favourite among students who want a proper sit-down meal without trekking off campus. Located inside UCC's Amamoma area, the restaurant offers a broad menu that runs from Ghanaian classics to grilled meats, pasta, and fresh salads. It's open six days a week with extended evening hours, making it suitable for everything from a lunch break to a relaxed weekend dinner. With a 4.5 star rating and a welcoming ambience, Taste N Tell consistently delivers on its name.",
    image:
      "https://lh3.googleusercontent.com/place-photos/AJRVUZP6AaPCV3Az6YkTJra8z6tYktXHmxaQi1vZZpmrGhfhgHJxpmW2dyOcOjSePYi0Hp7iI1nyvAqnRhIoZkcwLfebEkMtDCw39tZ4UzKaSdbeOhEj0fTGMQNkzIrEWafLm9uPKEwWnWVXuNYUnA=s4800-w578-h600",
    flyer:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80",
    location: "Inside UCC, Amamoma",
    lat: 5.1113754,
    lng: -1.2936998,
    contact: "+233 50 672 8272",
    whatsapp: "233506728272",
    instagram: "taste_n_tell___",
    rating: { rate: 4.5, count: 11 },
    menu: [
      {
        name: "Grilled Chicken & Rice",
        description:
          "Herb-marinated whole chicken thighs grilled to golden perfection, served with jollof or fried rice.",
        priceMin: 45,
        priceMax: 70,
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
      },
      {
        name: "Pasta Bolognese",
        description:
          "Al dente pasta tossed in a slow-cooked minced beef and tomato ragu, finished with parmesan.",
        priceMin: 40,
        priceMax: 60,
        image:
          "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&q=80",
      },
      {
        name: "Beef Burger",
        description:
          "Thick beef patty in a toasted bun with lettuce, tomato, cheese, and house-made burger sauce.",
        priceMin: 40,
        priceMax: 65,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
      },
      {
        name: "Jollof Rice & Fish",
        description:
          "Taste N Tell's well-seasoned jollof rice paired with grilled or fried fish and fresh salad.",
        priceMin: 30,
        priceMax: 48,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
    ],
    delivery: true,
    deliveryFee: "GHS 5",
    openHours: "Mon – Fri: 9:00 AM – 5:00 PM | Sat: 9:00 AM – 10:00 PM | Sun: 10:30 AM – 10:00 PM",
    category: "restaurant",
    tags: ["grilled", "pasta", "burger", "jollof", "all-day"],
    featured: true,
  },
  {
    id: "university-kitchen",
    name: "University Kitchen / Restaurant (124)",
    shortDescription: "The campus's own canteen — affordable Ghanaian meals near the Central Mosque.",
    description:
      "University Kitchen, known locally as Restaurant 124, is the heart of on-campus dining at UCC. Operated by the university itself, it provides affordable, filling Ghanaian meals to students, staff, and visitors six days a week. The kitchen rotates daily specials of local dishes — rice, soups, stews, and traditional swallows — ensuring variety throughout the week. While the setting is functional rather than fancy, the food is honest and the prices are among the most student-friendly on campus.",
    image:
      "https://lh3.googleusercontent.com/place-photos/AJRVUZPLJ2IVT8grz7tuUhhloM3v6BVDvxkqM_P_B0hOc-7W7q6ieZKo0pLa38lc8yfTelfAd2yaA4nclIylV4cCriU7FeoXpxG_LGBWzMwcziE-R9KqvAjguaJ97zoUmc0tpUbnKVvGDlg92oaXeQ=s4800-w800-h600",
    flyer:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
    location: "Near Central Mosque, on campus",
    lat: 5.1287897,
    lng: -1.2852428,
    contact: null,
    whatsapp: null,
    rating: { rate: 3.5, count: 93 },
    menu: [
      {
        name: "Daily Rice Dish",
        description:
          "A rotating daily special — jollof, fried, or plain rice served with the day's stew and protein of choice.",
        priceMin: 20,
        priceMax: 35,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
      {
        name: "Waakye Plate",
        description:
          "Classic waakye with tomato stew, spaghetti, gari, and your choice of chicken, beef, or boiled egg.",
        priceMin: 18,
        priceMax: 32,
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",
      },
      {
        name: "Banku & Soup",
        description:
          "Freshly made fermented corn dough served with light or okra soup and your choice of fish or meat.",
        priceMin: 25,
        priceMax: 40,
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
      },
      {
        name: "Fufu & Groundnut Soup",
        description:
          "Pounded fufu immersed in a thick, nutty groundnut soup with chicken or goat meat.",
        priceMin: 28,
        priceMax: 45,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Mon – Sat: 8:00 AM – Late | Sun: Closed",
    category: "local",
    tags: ["waakye", "fufu", "banku", "campus canteen", "affordable"],
    featured: false,
  },
  {
    id: "sasakawa-restaurant",
    name: "Sasakawa Restaurant",
    shortDescription: "Well-established campus restaurant near the Admin block with a broad menu.",
    description:
      "Sasakawa Restaurant is one of UCC's most recognised dining establishments, sitting conveniently near the Admin block and drawing a steady crowd of students, lecturers, and administrative staff throughout the day. The menu spans a wide range — from Ghanaian home dishes and grilled proteins to continental plates and light bites — making it a versatile choice for any meal. Sasakawa's longevity on campus is testament to reliable food and a pleasant, shaded seating area that offers a welcome break from the academic day.",
    image:
      "https://lh3.googleusercontent.com/place-photos/AJRVUZMaefjd6IR00x8S2bfIaS2lXsQpmtpmFc6Uh2OdncEub6TPL28nMonFQurPfuFwkF9t3NjG6oBkqSOn0ldWHg_m7_rq59NhOBnnZ66PNBYsu4P4go_Io0g8Y8CEyV_5kR1e221xSfu-xaP3TsE=s4800-w800-h600",
    flyer:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    location: "Near Admin block, on campus",
    lat: 5.1183508,
    lng: -1.2897315,
    contact: "+233 20 586 6305",
    whatsapp: "233205866305",
    rating: { rate: 3.7, count: 192 },
    menu: [
      {
        name: "Jollof Rice & Grilled Chicken",
        description:
          "Sasakawa's signature smoky jollof paired with well-seasoned grilled chicken and a side salad.",
        priceMin: 35,
        priceMax: 55,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
      {
        name: "Continental Plate",
        description:
          "Mashed potato or rice with a choice of beef, chicken, or fish in a rich tomato-herb sauce.",
        priceMin: 40,
        priceMax: 65,
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
      },
      {
        name: "Grilled Tilapia & Banku",
        description:
          "Whole tilapia grilled over charcoal with fermented banku and a side of fresh pepper sauce.",
        priceMin: 45,
        priceMax: 70,
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
      },
      {
        name: "Club Sandwich",
        description:
          "Triple-decker toasted sandwich with grilled chicken, lettuce, tomato, and a generous spread of mayo.",
        priceMin: 25,
        priceMax: 40,
        image:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Mon – Sat: 8:00 AM – 8:00 PM | Sun: Closed",
    category: "restaurant",
    tags: ["jollof", "continental", "grilled", "campus", "tilapia"],
    featured: true,
  },
  {
    id: "golden-cape-cafe",
    name: "Golden Cape Cafe (Eve's Pork)",
    shortDescription: "Cape Coast's pork specialist — smoky, slow-cooked, and utterly irresistible.",
    description:
      "Golden Cape Cafe, widely known on campus as Eve's Pork, has built a devoted following for one thing above all else: exceptional pork dishes. The pork is slow-cooked, deeply seasoned, and finished over open flame for a smoky char that keeps diners coming back. Whether it's pork belly, ribs, or grilled chops, every cut is handled with skill and served generously. Located on the Cape Coast side, it's a short trip from campus that serious food lovers will agree is absolutely worth it.",
    image:
      "https://lh3.googleusercontent.com/place-photos/AJRVUZPabxjLR2EmJrWBTqfcMYrvhVj1r2Vu1Aram_i04RyGwGtv_YywRYAS4Lj7lJDiHCUQhEzerxHrh77MSXaSv9-bFmZbHgjSwGYxevqskRn8IuB7MfwsxplM8th4l0089sxQJVFjoiSiEwKHWw=s4800-w800-h600",
    flyer:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    location: "Cape Coast side",
    lat: 5.1261892,
    lng: -1.2776269,
    contact: "+233 24 331 9396",
    whatsapp: "233243319396",
    rating: { rate: 4.3, count: 4 },
    menu: [
      {
        name: "Pork Belly & Rice",
        description:
          "Slow-roasted pork belly with crispy crackling, served over steamed rice with a spiced pepper sauce.",
        priceMin: 50,
        priceMax: 80,
        image:
          "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&q=80",
      },
      {
        name: "Grilled Pork Chops",
        description:
          "Thick-cut pork chops marinated in garlic and herbs, grilled over open flame and served with yam or plantain.",
        priceMin: 55,
        priceMax: 85,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      },
      {
        name: "Pork Stew & Yam",
        description:
          "Tender chunks of pork simmered in a rich tomato and onion stew, served with boiled yam or cocoyam.",
        priceMin: 45,
        priceMax: 70,
        image:
          "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
      },
      {
        name: "Pork Kebab Skewers",
        description:
          "Spiced pork cubes threaded on skewers and chargrilled, served with chimichurri sauce and fresh salad.",
        priceMin: 40,
        priceMax: 65,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
      },
    ],
    delivery: false,
    deliveryFee: null,
    openHours: "Tue – Sun: 12:30 PM – 11:00 PM | Mon: Closed",
    category: "restaurant",
    tags: ["pork", "grilled", "slow-cooked", "cape coast", "ribs"],
    featured: false,
  },
  {
    id: "kfc-cape-coast",
    name: "KFC Cape Coast",
    shortDescription: "The iconic global chain — Original Recipe chicken just off campus on Takoradi Road.",
    description:
      "KFC Cape Coast needs little introduction. Sitting just off the Cape Coast–Takoradi Road, it's the closest international fast-food chain to UCC and a wildly popular choice for students craving that unmistakable Original Recipe crunch. With over 2,000 Google ratings and a 4.6-star average, it consistently delivers the KFC experience — crispy seasoned chicken, hearty burgers, and combo meals — in a clean, air-conditioned setting. Perfect for a treat between lectures or a group outing from campus.",
    image:
      "https://lh3.googleusercontent.com/place-photos/AJRVUZMykv5wiFKMJLhixPkV1wjGmEno6KOIQmW8UcDzfY3cDL06OYqqH3oOC8AuYc9gMlREWLcCygPlbNwOuKiiDOh4vFDdoBdSLiCgBdwUCGvfHX37TnPDzFMZefImUhxj6YZtNhCfFZs2eOmHQxk=s4800-w800-h600",
    flyer:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80",
    location: "Cape Coast–Takoradi Rd (off campus)",
    lat: 5.1206524,
    lng: -1.2727109,
    contact: "+233 59 403 1148",
    whatsapp: "233594031148",
    website: "https://www.kfc.com.gh/",
    rating: { rate: 4.6, count: 2241 },
    menu: [
      {
        name: "Original Recipe Bucket",
        description:
          "The iconic 6-piece KFC bucket of perfectly seasoned Original Recipe chicken — finger lickin' good.",
        priceMin: 85,
        priceMax: 130,
        image:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
      },
      {
        name: "Zinger Burger",
        description:
          "Spicy crispy chicken fillet in a toasted sesame bun with Zinger sauce, lettuce, and pickles.",
        priceMin: 45,
        priceMax: 70,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
      },
      {
        name: "Twister Wrap",
        description:
          "Warm flour tortilla filled with crispy chicken strips, lettuce, tomato, and creamy Caesar dressing.",
        priceMin: 40,
        priceMax: 60,
        image:
          "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80",
      },
      {
        name: "Family Feast",
        description:
          "A sharing platter of Original Recipe and Hot & Crispy pieces with fries, coleslaw, and drinks for the group.",
        priceMin: 150,
        priceMax: 220,
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
      },
    ],
    delivery: true,
    deliveryFee: "GHS 10",
    openHours: "Daily, Hours Vary",
    category: "fast_food",
    tags: ["KFC", "fried chicken", "burger", "fast food", "international"],
    featured: true,
  },
];

export const categories = [
  { value: "all", label: "All Vendors" },
  { value: "local", label: "Local Dishes" },
  { value: "restaurant", label: "Restaurants" },
  { value: "fast_food", label: "Fast Food" },
  { value: "cafe", label: "Cafés & Drinks" },
  { value: "chinese", label: "Chinese / International" },
];

export const featuredVendors = vendors.filter((v) => v.featured);
