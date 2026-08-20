export const menuData = {
  ramen: [
    // VEG RAMEN
    {
      id: 'veg-miso',
      name: 'Miso Ramen',
      category: 'veg',
      type: 'ramen',
      price: 199,
      description: 'Rich, savory miso-paste broth served with fresh wavy noodles, tender bamboo shoots, wood ear mushrooms, sweet corn, and green onions.',
      ingredients: ['Signature Miso Broth', 'Wavy Wheat Noodles', 'Wood Ear Mushrooms', 'Bamboo Shoots', 'Sweet Corn', 'Garnished Nori', 'Spring Onions'],
      spiceLevel: 1,
      image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#C4A276',
        noodleType: 'wavy',
        toppings: ['bamboo', 'mushrooms', 'corn', 'scallions'],
        liquidRoughness: 0.1,
      }
    },
    {
      id: 'veg-shoyu',
      name: 'Shoyu Ramen',
      category: 'veg',
      type: 'ramen',
      price: 199,
      description: 'A delicate soy-sauce infused clear vegetable broth with noodles, fresh bok choy, marinated tofu, marinated soft bamboo, and seaweed.',
      ingredients: ['Clear Shoyu Broth', 'Classic Ramen Noodles', 'Marinated Tofu', 'Bok Choy', 'Bamboo Shoots', 'Toasted Sesame', 'Nori Strip'],
      spiceLevel: 0,
      image: 'https://images.unsplash.com/photo-1614563637806-1d0e645e0940?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#664426',
        noodleType: 'thin',
        toppings: ['tofu', 'bok-choy', 'scallions'],
        liquidRoughness: 0.05,
      }
    },
    {
      id: 'veg-lemon',
      name: 'Lemon Ramen',
      category: 'veg',
      type: 'ramen',
      price: 199,
      description: 'A refreshing, zesty light broth brightened with fresh lemon citrus wheel slices, baby spinach, roasted garlic oil, and seasonal microgreens.',
      ingredients: ['Lemon Zest Light Broth', 'Thin Noodles', 'Fresh Lemon Slices', 'Baby Spinach', 'Roasted Garlic Oil', 'Silken Tofu', 'Microgreens'],
      spiceLevel: 0,
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#E5D799',
        noodleType: 'thin',
        toppings: ['lemon-slices', 'spinach', 'tofu'],
        liquidRoughness: 0.08,
      }
    },
    {
      id: 'veg-kimchi',
      name: 'Kimchi Ramen',
      category: 'veg',
      type: 'ramen',
      price: 209,
      description: 'Fiery, tangy kimchi-infused rich broth topped with stir-fried aged kimchi, green onions, mushrooms, and toasted sesame seeds.',
      ingredients: ['Spicy Kimchi Broth', 'Aged Kimchi', 'Ramen Noodles', 'Shiitake Mushrooms', 'Green Onions', 'Chili Threads', 'Toasted Sesame'],
      spiceLevel: 3,
      image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#A3261F',
        noodleType: 'wavy',
        toppings: ['kimchi', 'mushrooms', 'chili-threads'],
        liquidRoughness: 0.15,
      }
    },
    {
      id: 'veg-black-garlic',
      name: 'Black Garlic Ramen',
      category: 'veg',
      type: 'ramen',
      price: 219,
      description: 'Indulgent, deeply umami broth flavored with home-made roasted black garlic oil (Mayu), charred broccoli, wood ear mushrooms, and sesame.',
      ingredients: ['Umami Veg Broth', 'Roasted Black Garlic Oil', 'Noodles', 'Charred Broccoli', 'Wood Ear Mushrooms', 'Tofu Cubes', 'Sesame Seeds'],
      spiceLevel: 1,
      image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#1F1A17',
        noodleType: 'thin',
        toppings: ['mayu-swirls', 'broccoli', 'mushrooms'],
        liquidRoughness: 0.2,
      }
    },
    {
      id: 'veg-kewpie-mayo',
      name: 'Kewpie Mayo Ramen',
      category: 'veg',
      type: 'ramen',
      price: 229,
      description: 'Ultra-creamy, velvety broth blended with premium Japanese Kewpie mayo, finished with crispy garlic flakes, sweet corn, and baby corn.',
      ingredients: ['Velvety Kewpie Broth', 'Ramen Noodles', 'Crispy Garlic Flakes', 'Sweet Corn', 'Baby Corn', 'Scallions', 'Nori Square'],
      spiceLevel: 0,
      image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#EDE6D0',
        noodleType: 'wavy',
        toppings: ['mayo-drizzle', 'corn', 'garlic-chips'],
        liquidRoughness: 0.25,
      }
    },
    {
      id: 'veg-curry',
      name: 'Curry Ramen',
      category: 'veg',
      type: 'ramen',
      price: 239,
      description: 'Warm, aromatic Japanese-style golden curry broth packed with carrots, potatoes, cherry tomatoes, and fried tempura tofu flakes.',
      ingredients: ['Aromatic Golden Curry Broth', 'Thick Chewy Noodles', 'Potato Cubes', 'Carrot Wedges', 'Cherry Tomatoes', 'Tempura Crisps', 'Green Herbs'],
      spiceLevel: 2,
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#B08A30',
        noodleType: 'thick',
        toppings: ['curry-potato', 'cherry-tomatoes', 'tempura'],
        liquidRoughness: 0.12,
      }
    },

    // NON-VEG RAMEN
    {
      id: 'nonveg-miso',
      name: 'Miso Ramen',
      category: 'non-veg',
      type: 'ramen',
      price: 229,
      description: 'Rich, savory miso chicken broth topped with slow-roasted pork/chicken chashu, soft-boiled marinated Ajitama egg, wood ear mushrooms, and scallions.',
      ingredients: ['Miso Chicken Broth', 'Noodles', 'Slow-Roasted Chashu', 'Ajitama Soft Egg', 'Wood Ear Mushrooms', 'Sweet Corn', 'Spring Onions'],
      spiceLevel: 1,
      image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#C4A276',
        noodleType: 'wavy',
        toppings: ['chashu', 'egg-half', 'mushrooms', 'scallions'],
        liquidRoughness: 0.1,
      }
    },
    {
      id: 'nonveg-shoyu',
      name: 'Shoyu Ramen',
      category: 'non-veg',
      type: 'ramen',
      price: 229,
      description: 'Traditional light, soy-sauce infused chicken broth with chewy noodles, slow-cooked chashu, soft-boiled egg, fresh narutomaki (fish cake), and nori.',
      ingredients: ['Chicken Shoyu Broth', 'Chewy Noodles', 'Roasted Chashu Slice', 'Ajitama Soft Egg', 'Narutomaki Fish Cake', 'Nori Strip', 'Scallions'],
      spiceLevel: 0,
      image: 'https://images.unsplash.com/photo-1614563637806-1d0e645e0940?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#664426',
        noodleType: 'thin',
        toppings: ['chashu', 'egg-half', 'fish-cake'],
        liquidRoughness: 0.05,
      }
    },
    {
      id: 'nonveg-lemon',
      name: 'Lemon Ramen',
      category: 'non-veg',
      type: 'ramen',
      price: 229,
      description: 'Tangy, double-boiled chicken citrus broth garnished with lemon wheels, tender shredded chicken breast, spinach, soft-boiled egg, and microgreens.',
      ingredients: ['Citrus Chicken Broth', 'Thin Noodles', 'Shredded Chicken', 'Lemon Wheels', 'Ajitama Soft Egg', 'Baby Spinach', 'Microgreens'],
      spiceLevel: 0,
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#E5D799',
        noodleType: 'thin',
        toppings: ['shredded-chicken', 'lemon-slices', 'egg-half'],
        liquidRoughness: 0.08,
      }
    },
    {
      id: 'nonveg-kimchi',
      name: 'Kimchi Ramen',
      category: 'non-veg',
      type: 'ramen',
      price: 259,
      description: 'Fiery, robust chicken broth loaded with spicy fermented kimchi, tender pork/chicken chashu, soft-boiled egg, mushrooms, and toasted sesame.',
      ingredients: ['Fiery Kimchi Chicken Broth', 'Stir-Fried Kimchi', 'Chashu Slices', 'Ajitama Soft Egg', 'Shiitake Mushrooms', 'Chili Threads', 'Sesame'],
      spiceLevel: 3,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#A3261F',
        noodleType: 'wavy',
        toppings: ['chashu', 'kimchi', 'egg-half', 'chili-threads'],
        liquidRoughness: 0.15,
      }
    },
    {
      id: 'nonveg-black-garlic',
      name: 'Black Garlic Ramen',
      category: 'non-veg',
      type: 'ramen',
      price: 249,
      description: 'Decadent umami chicken broth layered with aromatic black garlic oil (Mayu), grilled chicken thigh, soft-boiled egg, charred broccoli, and scallions.',
      ingredients: ['Chicken Umami Broth', 'House Black Garlic Oil', 'Grilled Chicken Thigh', 'Ajitama Soft Egg', 'Charred Broccoli', 'Wood Ear Mushrooms'],
      spiceLevel: 1,
      image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#1F1A17',
        noodleType: 'thin',
        toppings: ['mayu-swirls', 'chicken-thigh', 'egg-half', 'mushrooms'],
        liquidRoughness: 0.2,
      }
    },
    {
      id: 'nonveg-kewpie-mayo',
      name: 'Kewpie Mayo Ramen',
      category: 'non-veg',
      type: 'ramen',
      price: 259,
      description: 'Velvety creamy broth blended with Japanese Kewpie mayo, loaded with crispy pan-seared pork sausage slices, soft-boiled egg, and crisp garlic flakes.',
      ingredients: ['Creamy Mayo Chicken Broth', 'Pan-Seared Sausage Slices', 'Ajitama Soft Egg', 'Sweet Corn', 'Crispy Garlic Flakes', 'Scallions'],
      spiceLevel: 0,
      image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#EDE6D0',
        noodleType: 'wavy',
        toppings: ['sausage-slices', 'egg-half', 'corn', 'garlic-chips'],
        liquidRoughness: 0.25,
      }
    },
    {
      id: 'nonveg-curry',
      name: 'Curry Ramen',
      category: 'non-veg',
      type: 'ramen',
      price: 269,
      description: 'Hearty golden Japanese curry broth topped with crispy panko-fried chicken katsu, soft-boiled egg, carrots, potatoes, and pickled red ginger.',
      ingredients: ['Golden Curry Chicken Broth', 'Crispy Chicken Katsu', 'Ajitama Soft Egg', 'Potato Cubes', 'Carrot Wedges', 'Pickled Red Ginger', 'Spring Onion'],
      spiceLevel: 2,
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80',
      threeConfig: {
        brothColor: '#B08A30',
        noodleType: 'thick',
        toppings: ['katsu-strips', 'egg-half', 'potato', 'ginger'],
        liquidRoughness: 0.12,
      }
    }
  ],

  addOns: [
    // VEG ADD-ONS
    {
      id: 'addon-paneer-dumplings',
      name: 'Paneer Dumplings (2 pcs)',
      category: 'veg',
      type: 'add-on',
      price: 50,
      description: 'Soft pan-fried dumplings stuffed with spiced paneer, cabbage, and ginger.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'addon-veg-dumplings',
      name: 'Veg Dumplings (2 pcs)',
      category: 'veg',
      type: 'add-on',
      price: 40,
      description: 'Crispy pan-fried dumplings filled with water chestnuts, carrots, and mushrooms.',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'addon-dango-stick',
      name: 'Dango Stick',
      category: 'veg',
      type: 'add-on',
      price: 40,
      description: 'Sweet, chewy skewered rice flour dumplings glazed with sweet soy glaze (mitarashi).',
      image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'addon-cheese-slice',
      name: 'Cheese Slice (2 pcs)',
      category: 'veg',
      type: 'add-on',
      price: 40,
      description: 'Melty, processed cheddar slices, perfect for draping over boiling hot ramen broth.',
      image: 'https://images.unsplash.com/photo-1552763407-1466022e9cd1?w=400&auto=format&fit=crop&q=80'
    },

    // NON-VEG ADD-ONS
    {
      id: 'addon-prawns',
      name: 'Prawns (4 pcs)',
      category: 'non-veg',
      type: 'add-on',
      price: 99,
      description: 'Succulent pan-fried jumbo prawns tossed in sweet-garlic soy glaze.',
      image: 'https://images.unsplash.com/photo-1559737607-3578909a52bc?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'addon-sausage',
      name: 'Sausage (2 pcs)',
      category: 'non-veg',
      type: 'add-on',
      price: 90,
      description: 'Grilled pork/chicken Arabiki style cocktails, juicy with a snap.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'addon-fish-cake-stick',
      name: 'Fish Cake Stick',
      category: 'non-veg',
      type: 'add-on',
      price: 80,
      description: 'Korean Eomuk skewered fish cake, stewed in light soy kelp broth.',
      image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'addon-fish-cake',
      name: 'Fish Cake (2 pcs)',
      category: 'non-veg',
      type: 'add-on',
      price: 70,
      description: 'Classic sliced Japanese Narutomaki fish cakes with the iconic pink swirl.',
      image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'addon-chashu',
      name: 'Chashu (2 pcs)',
      category: 'non-veg',
      type: 'add-on',
      price: 70,
      description: 'Slow-braised rolled pork belly slices, caramelized and meltingly tender.',
      image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'addon-salami',
      name: 'Salami (2 pcs)',
      category: 'non-veg',
      type: 'add-on',
      price: 70,
      description: 'Thinly sliced cured beef/pork salami, pan-singed to order.',
      image: 'https://images.unsplash.com/photo-152418262099e-80c5d7ccb1b5?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'addon-chicken-dumplings',
      name: 'Chicken Dumplings (2 pcs)',
      category: 'non-veg',
      type: 'add-on',
      price: 50,
      description: 'Juicy pan-fried chicken and scallion gyoza served with soy dipping vinegar.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=80'
    }
  ]
};
