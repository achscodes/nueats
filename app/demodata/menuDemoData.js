// Demo data simulating database structure for MySQL
// This structure will make it easy to transition to real database queries

export const MENU_CATEGORIES = [
  { id: 1, name: "All", slug: "all" },
  { id: 2, name: "Meals", slug: "meals" },
  { id: 3, name: "Snacks", slug: "snacks" },
  { id: 4, name: "Beverages", slug: "beverages" },
  { id: 5, name: "Desserts", slug: "desserts" },
];

export const MENU_ITEMS = [
  // Meals
  {
    id: 1,
    name: "Adobo",
    description:
      "Tender chicken simmered in soy sauce and vinegar. A classic Pinoy favorite!",
    price: 120,
    prep_time: 35,
    category_id: 2,
    category: "meals",
    image:
      "https://assets.bonappetit.com/photos/60419b8c970fc321b2086e48/1:1/w_1124,h_1124,c_limit/GO-Live-Pineapple-Pork-3.jpg",
    is_featured: true,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 2,
    name: "Sinigang",
    description: "Sour tamarind broth with tender pork and fresh vegetables.",
    price: 150,
    prep_time: 45,
    category_id: 2,
    category: "meals",
    image:
      "https://charisseyu.com/wp-content/uploads/2023/12/IMG_0135-scaled.jpg",
    is_featured: true,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 3,
    name: "Kare-Kare",
    description:
      "Rich peanut-based stew with oxtail and vegetables served with bagoong.",
    price: 180,
    prep_time: 50,
    category_id: 2,
    category: "meals",
    image:
      "https://www.kawalingpinoy.com/wp-content/uploads/2014/01/kare-kare-with-oxtail-2.jpg",
    is_featured: true,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 4,
    name: "Lechon Kawali",
    description:
      "Crispy deep-fried pork belly served with liver sauce. A true fiesta dish!",
    price: 250,
    prep_time: 40,
    category_id: 2,
    category: "meals",
    image:
      "https://images.yummy.ph/yummy/uploads/2021/06/spicylechonkawalirecipe-web.jpg",
    is_featured: true,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 5,
    name: "Beef Caldereta",
    description:
      "Hearty beef stew in tomato sauce with potatoes and bell peppers.",
    price: 200,
    prep_time: 55,
    category_id: 2,
    category: "meals",
    image:
      "https://images.yummy.ph/yummy/uploads/2019/08/beefkaldereta-640-1.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 6,
    name: "Chicken Inasal",
    description: "Grilled chicken marinated in lemongrass and annatto oil.",
    price: 160,
    prep_time: 30,
    category_id: 2,
    category: "meals",
    image:
      "https://cdn.sanity.io/images/f3knbc2s/production/19481ad7bcff23ce2904eeb435f5ddc2c05df796-2500x1600.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },

  // Snacks
  {
    id: 7,
    name: "Lumpia Shanghai",
    description:
      "Crispy spring rolls filled with seasoned ground pork and vegetables.",
    price: 80,
    prep_time: 15,
    category_id: 3,
    category: "snacks",
    image:
      "https://graceland.ph/wp-content/uploads/2023/05/LUMPIA-SHANGHAI.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 8,
    name: "Kwek-Kwek",
    description:
      "Deep-fried quail eggs coated in orange batter with spicy vinegar dip.",
    price: 50,
    prep_time: 12,
    category_id: 3,
    category: "snacks",
    image:
      "https://eggsallways.com/wp-content/uploads/2025/05/kwek-kwek-10-320x480.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 9,
    name: "Chicken Wings",
    description: "Crispy buffalo wings with ranch dipping sauce.",
    price: 120,
    prep_time: 20,
    category_id: 3,
    category: "snacks",
    image:
      "https://asset.homechef.com/uploads/meal/plated/2705/homechef_Sambal_Chicken_Wings_Reshoot__2_of_3_.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 10,
    name: "Cheese Sticks",
    description: "Golden fried cheese sticks served with marinara sauce.",
    price: 90,
    prep_time: 10,
    category_id: 3,
    category: "snacks",
    image:
      "https://i0.wp.com/www.angsarap.net/wp-content/uploads/2014/01/cheese-sticks-wide.jpg?ssl=1",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },

  // Beverages
  {
    id: 11,
    name: "Fresh Buko Juice",
    description: "Refreshing young coconut water served chilled.",
    price: 60,
    prep_time: 5,
    category_id: 4,
    category: "beverages",
    image:
      "https://i.pinimg.com/736x/f5/7b/9c/f57b9c002ba6c57f8267b5f747efabfd.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 12,
    name: "Calamansi Juice",
    description:
      "Tangy Filipino lime juice, perfectly sweetened and refreshing.",
    price: 45,
    prep_time: 3,
    category_id: 4,
    category: "beverages",
    image:
      "https://www.kawalingpinoy.com/wp-content/uploads/2013/05/calamansi-juice.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 13,
    name: "Iced Coffee",
    description:
      "Rich Filipino barako coffee served over ice with condensed milk.",
    price: 75,
    prep_time: 5,
    category_id: 4,
    category: "beverages",
    image: "https://www.pamperedchef.com/iceberg/com/recipe/2132087-lg.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 14,
    name: "Mango Shake",
    description: "Creamy mango shake made with fresh Philippine mangoes.",
    price: 85,
    prep_time: 7,
    category_id: 4,
    category: "beverages",
    image:
      "https://tastyoven.com/wp-content/uploads/2022/06/mango-shake-image.jpeg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },

  // Desserts
  {
    id: 15,
    name: "Halo-Halo",
    description:
      "Traditional Filipino shaved ice dessert with mixed fruits and ube ice cream.",
    price: 120,
    prep_time: 15,
    category_id: 5,
    category: "desserts",
    image:
      "https://pilipinasrecipes.com/wp-content/uploads/2018/03/Filipino-Halo-Halo-Recipe.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 16,
    name: "Leche Flan",
    description: "Silky smooth caramel custard dessert, a Filipino classic.",
    price: 80,
    prep_time: 8,
    category_id: 5,
    category: "desserts",
    image:
      "https://www.kawalingpinoy.com/wp-content/uploads/2017/04/whole-eggs-leche-flan-2.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 17,
    name: "Ube Ice Cream",
    description: "Creamy purple yam ice cream with a rich, nutty flavor.",
    price: 65,
    prep_time: 3,
    category_id: 5,
    category: "desserts",
    image: "https://zhangcatherine.com/wp-content/uploads/2021/09/be.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
  {
    id: 18,
    name: "Biko",
    description: "Sweet sticky rice cake topped with coconut caramel sauce.",
    price: 55,
    prep_time: 10,
    category_id: 5,
    category: "desserts",
    image:
      "https://www.kawalingpinoy.com/wp-content/uploads/2018/09/bibingkang-malagkit-11-500x500.jpg",
    is_featured: false,
    is_available: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
  },
];

// Database-like functions (simulate API calls)
export const getMenuItems = (category = "all", searchQuery = "") => {
  let filteredItems = MENU_ITEMS.filter((item) => item.is_available);

  // Filter by category
  if (category !== "all") {
    filteredItems = filteredItems.filter((item) => item.category === category);
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }

  return filteredItems;
};

export const getFeaturedItems = () => {
  return MENU_ITEMS.filter((item) => item.is_featured && item.is_available);
};

export const getCategories = () => {
  return MENU_CATEGORIES;
};

export const getItemById = (id) => {
  return MENU_ITEMS.find((item) => item.id === parseInt(id));
};
