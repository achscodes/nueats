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
    category_id: 2,
    category: "meals",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
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
    category_id: 2,
    category: "meals",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop",
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
    category_id: 2,
    category: "meals",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
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
    category_id: 2,
    category: "meals",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop",
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
    category_id: 3,
    category: "snacks",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop",
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
    category_id: 3,
    category: "snacks",
    image:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=400&fit=crop",
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
    category_id: 3,
    category: "snacks",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=400&fit=crop",
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
    category_id: 3,
    category: "snacks",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
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
    category_id: 4,
    category: "beverages",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
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
    category_id: 4,
    category: "beverages",
    image:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
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
    category_id: 4,
    category: "beverages",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
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
    category_id: 4,
    category: "beverages",
    image:
      "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=400&fit=crop",
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
    category_id: 5,
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
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
    category_id: 5,
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop",
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
    category_id: 5,
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop",
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
    category_id: 5,
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
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
