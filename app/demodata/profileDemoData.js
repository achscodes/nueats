// Demo data for NUeats app
export const demoData = {
  // Current user profile
  currentUser: {
    id: "user_001",
    name: "Alden Richards",
    email: "alden.richards@students.nu.dasma.ph",
    phone: "+63 912 345 6074",
    password: "Alden@123", // Demo password - in production, this would be hashed
    avatar: "https://via.placeholder.com/100x100/2c3e91/ffffff?text=AR",
    profileImage: null, // Will be updated when user selects an image
    studentId: "2021-123456",
    course: "Computer Science",
    year: "3rd Year",
    address: {
      street: "123 Sampaguita Street",
      barangay: "Barangay San Jose",
      city: "DasmariÃƒÂ±as",
      province: "Cavite",
      zipCode: "4114",
    },
    preferences: {
      notifications: true,
      darkMode: false,
      language: "en",
      currency: "PHP",
    },
    createdAt: "2023-08-15T10:30:00Z",
    lastLogin: "2024-03-15T14:22:00Z",
    lastPasswordChange: "2024-01-15T09:00:00Z",
  },

  // Sample users for testing
  users: [
    {
      id: "user_001",
      name: "Alden Richards",
      email: "alden.richards@students.nu.dasma.ph",
      phone: "+63 912 345 6074",
      password: "Alden@123", // Demo password - in production, this would be hashed
      studentId: "2021-123456",
      course: "Computer Science",
      year: "3rd Year",
      profileImage: null,
      lastPasswordChange: "2024-01-15T09:00:00Z",
    },
    {
      id: "user_002",
      name: "Maine Mendoza",
      email: "maine.mendoza@students.nu.dasma.ph",
      phone: "+63 917 234 5678",
      password: "Maine#456", // Demo password - in production, this would be hashed
      studentId: "2021-123457",
      course: "Information Technology",
      year: "2nd Year",
      profileImage: null,
      lastPasswordChange: "2024-02-10T14:30:00Z",
    },
    {
      id: "user_003",
      name: "John Santos",
      email: "john.santos@students.nu.dasma.ph",
      phone: "+63 905 876 5432",
      password: "John$789", // Demo password - in production, this would be hashed
      studentId: "2020-987654",
      course: "Business Administration",
      year: "4th Year",
      profileImage: null,
      lastPasswordChange: "2023-12-05T11:15:00Z",
    },
    {
      id: "user_004",
      name: "Maria Garcia",
      email: "maria.garcia@students.nu.dasma.ph",
      phone: "+63 918 765 4321",
      password: "Maria&321", // Demo password - in production, this would be hashed
      studentId: "2022-111222",
      course: "Nursing",
      year: "1st Year",
      profileImage: null,
      lastPasswordChange: "2024-03-01T16:45:00Z",
    },
    {
      id: "user_005",
      name: "Rico Puno",
      email: "rico.puno@students.nu.dasma.ph",
      phone: "+63 919 888 7777",
      password: "Rico*654", // Demo password - in production, this would be hashed
      studentId: "2021-333444",
      course: "Engineering",
      year: "3rd Year",
      profileImage: null,
      lastPasswordChange: "2024-01-20T08:20:00Z",
    },
    {
      id: "user_006",
      name: "Irah Mae Faner",
      email: "irahmaefaner@gmail.com",
      phone: "09944235141",
      password: "Irah#124", // Demo password - in production, this would be hashed
      studentId: "2023-172459",
      course: "Information Technology",
      year: "3rd Year",
      profileImage: null,
      lastPasswordChange: "2024-01-20T08:20:00Z",
    },
  ],

  // Food menu items
  menuItems: [
    {
      id: "food_001",
      name: "Chicken Adobo",
      description:
        "Tender chicken simmered in soy sauce and vinegar. A classic Filipino favorite!",
      price: 150,
      category: "Main Course",
      image: "Ã°Å¸â€”â€”",
      ingredients: ["Chicken", "Soy Sauce", "Vinegar", "Garlic", "Bay Leaves"],
      spicyLevel: "Mild",
      servingSize: "1 serving",
      calories: 320,
      available: true,
      preparationTime: "15-20 minutes",
      rating: 4.8,
    },
    {
      id: "food_002",
      name: "Beef Kaldereta",
      description: "Rich and savory beef stew with vegetables in tomato sauce",
      price: 180,
      category: "Main Course",
      image: "Ã°Å¸â€º",
      ingredients: [
        "Beef",
        "Tomato Sauce",
        "Potatoes",
        "Carrots",
        "Bell Peppers",
      ],
      spicyLevel: "Medium",
      servingSize: "1 serving",
      calories: 450,
      available: true,
      preparationTime: "25-30 minutes",
      rating: 4.6,
    },
    {
      id: "food_003",
      name: "Pancit Canton",
      description:
        "Stir-fried noodles with mixed vegetables and choice of meat",
      price: 120,
      category: "Noodles",
      image: "Ã°Å¸Å“",
      ingredients: [
        "Canton Noodles",
        "Cabbage",
        "Carrots",
        "Pork",
        "Soy Sauce",
      ],
      spicyLevel: "Mild",
      servingSize: "1 serving",
      calories: 380,
      available: true,
      preparationTime: "10-15 minutes",
      rating: 4.5,
    },
    {
      id: "food_004",
      name: "Kare-Kare",
      description: "Oxtail and vegetables in thick savory peanut sauce",
      price: 200,
      category: "Main Course",
      image: "Ã°Å¸Â¥Ëœ",
      ingredients: [
        "Oxtail",
        "Peanut Sauce",
        "Eggplant",
        "String Beans",
        "Bok Choy",
      ],
      spicyLevel: "Mild",
      servingSize: "1 serving",
      calories: 520,
      available: true,
      preparationTime: "30-35 minutes",
      rating: 4.9,
    },
    {
      id: "food_005",
      name: "Lechon Kawali",
      description: "Crispy deep-fried pork belly served with liver sauce",
      price: 220,
      category: "Main Course",
      image: "Ã°Å¸Â¥",
      ingredients: ["Pork Belly", "Salt", "Pepper", "Bay Leaves"],
      spicyLevel: "Mild",
      servingSize: "1 serving",
      calories: 680,
      available: true,
      preparationTime: "20-25 minutes",
      rating: 4.7,
    },
    {
      id: "food_006",
      name: "Chicken Sisig",
      description: "Sizzling chopped chicken with onions and peppers",
      price: 160,
      category: "Appetizer",
      image: "Ã°Å¸Â³",
      ingredients: [
        "Chicken",
        "Onions",
        "Chili Peppers",
        "Calamansi",
        "Mayonnaise",
      ],
      spicyLevel: "Hot",
      servingSize: "1 serving",
      calories: 290,
      available: false,
      preparationTime: "15-20 minutes",
      rating: 4.4,
    },
    {
      id: "food_007",
      name: "Halo-Halo",
      description:
        "Traditional Filipino dessert with mixed ingredients and ice cream",
      price: 85,
      category: "Dessert",
      image: "Ã°Å¸Â§",
      ingredients: [
        "Shaved Ice",
        "Ube",
        "Leche Flan",
        "Sweet Beans",
        "Ice Cream",
      ],
      spicyLevel: "None",
      servingSize: "1 serving",
      calories: 350,
      available: true,
      preparationTime: "5-10 minutes",
      rating: 4.8,
    },
    {
      id: "food_008",
      name: "Lumpia Shanghai",
      description: "Crispy fried spring rolls filled with seasoned ground pork",
      price: 100,
      category: "Appetizer",
      image: "Ã°Å¸Å’Â¯",
      ingredients: ["Ground Pork", "Spring Roll Wrapper", "Carrots", "Onions"],
      spicyLevel: "Mild",
      servingSize: "6 pieces",
      calories: 240,
      available: true,
      preparationTime: "10-15 minutes",
      rating: 4.6,
    },
  ],

  // Transaction history
  transactions: [
    {
      id: "txn_001",
      userId: "user_001",
      orderNumber: "NU-2024-001",
      date: "2024-03-15T12:30:00Z",
      status: "Completed",
      items: [
        {
          foodId: "food_001",
          name: "Chicken Adobo",
          quantity: 2,
          price: 150,
          total: 300,
        },
        {
          foodId: "food_007",
          name: "Halo-Halo",
          quantity: 1,
          price: 85,
          total: 85,
        },
      ],
      subtotal: 385,
      deliveryFee: 25,
      total: 410,
      paymentMethod: "GCash",
      deliveryAddress: "Room 301, Main Building, NU DasmariÃƒÂ±as",
      estimatedDelivery: "12:45 PM",
      actualDelivery: "12:42 PM",
      rating: 5,
      review: "Delicious food! Fast delivery too.",
    },
    {
      id: "txn_002",
      userId: "user_001",
      orderNumber: "NU-2024-002",
      date: "2024-03-12T14:15:00Z",
      status: "Completed",
      items: [
        {
          foodId: "food_003",
          name: "Pancit Canton",
          quantity: 1,
          price: 120,
          total: 120,
        },
        {
          foodId: "food_008",
          name: "Lumpia Shanghai",
          quantity: 1,
          price: 100,
          total: 100,
        },
      ],
      subtotal: 220,
      deliveryFee: 25,
      total: 245,
      paymentMethod: "Cash",
      deliveryAddress: "Library, 2nd Floor, NU DasmariÃƒÂ±as",
      estimatedDelivery: "2:30 PM",
      actualDelivery: "2:35 PM",
      rating: 4,
      review: "Good food, slightly late delivery.",
    },
    {
      id: "txn_003",
      userId: "user_001",
      orderNumber: "NU-2024-003",
      date: "2024-03-10T11:00:00Z",
      status: "Completed",
      items: [
        {
          foodId: "food_004",
          name: "Kare-Kare",
          quantity: 1,
          price: 200,
          total: 200,
        },
      ],
      subtotal: 200,
      deliveryFee: 25,
      total: 225,
      paymentMethod: "GCash",
      deliveryAddress: "Cafeteria Area, NU DasmariÃƒÂ±as",
      estimatedDelivery: "11:20 AM",
      actualDelivery: "11:18 AM",
      rating: 5,
      review: "Amazing Kare-Kare! Will order again.",
    },
    {
      id: "txn_004",
      userId: "user_001",
      orderNumber: "NU-2024-004",
      date: "2024-03-08T16:45:00Z",
      status: "Cancelled",
      items: [
        {
          foodId: "food_005",
          name: "Lechon Kawali",
          quantity: 1,
          price: 220,
          total: 220,
        },
      ],
      subtotal: 220,
      deliveryFee: 25,
      total: 245,
      paymentMethod: "GCash",
      deliveryAddress: "Engineering Building, NU DasmariÃƒÂ±as",
      cancelReason: "Out of stock",
      refundAmount: 245,
      refundStatus: "Processed",
    },
    {
      id: "txn_005",
      userId: "user_001",
      orderNumber: "NU-2024-005",
      date: "2024-03-05T13:20:00Z",
      status: "Completed",
      items: [
        {
          foodId: "food_002",
          name: "Beef Kaldereta",
          quantity: 1,
          price: 180,
          total: 180,
        },
        {
          foodId: "food_007",
          name: "Halo-Halo",
          quantity: 2,
          price: 85,
          total: 170,
        },
      ],
      subtotal: 350,
      deliveryFee: 25,
      total: 375,
      paymentMethod: "Cash",
      deliveryAddress: "Student Lounge, NU DasmariÃƒÂ±as",
      estimatedDelivery: "1:40 PM",
      actualDelivery: "1:38 PM",
      rating: 4,
      review: "Great food combination!",
    },
  ],

  // Cart data (current session)
  cart: [
    {
      id: "cart_001",
      foodId: "food_001",
      name: "Chicken Adobo",
      price: 150,
      quantity: 1,
      image: "Ã°Å¸â€”â€”",
      notes: "Extra rice please",
    },
    {
      id: "cart_002",
      foodId: "food_007",
      name: "Halo-Halo",
      price: 85,
      quantity: 2,
      image: "Ã°Å¸Â§",
      notes: "",
    },
  ],

  // Categories
  categories: [
    {
      id: "cat_001",
      name: "Main Course",
      icon: "Ã°Å¸Â½Ã¯Â¸",
      description: "Hearty Filipino dishes",
    },
    {
      id: "cat_002",
      name: "Appetizer",
      icon: "Ã°Å¸Â¥â€”",
      description: "Start your meal right",
    },
    {
      id: "cat_003",
      name: "Noodles",
      icon: "Ã°Å¸Å“",
      description: "Asian noodle dishes",
    },
    {
      id: "cat_004",
      name: "Dessert",
      icon: "Ã°Å¸Â§",
      description: "Sweet endings",
    },
    {
      id: "cat_005",
      name: "Beverages",
      icon: "Ã°Å¸Â¥Â¤",
      description: "Refresh yourself",
    },
  ],

  // Delivery locations within NU DasmariÃƒÂ±as
  deliveryLocations: [
    {
      id: "loc_001",
      name: "Main Building",
      description: "Lobby, Classrooms, Faculty Offices",
      deliveryFee: 25,
      estimatedTime: "10-15 minutes",
    },
    {
      id: "loc_002",
      name: "Engineering Building",
      description: "All floors and laboratories",
      deliveryFee: 30,
      estimatedTime: "15-20 minutes",
    },
    {
      id: "loc_003",
      name: "Library",
      description: "All reading areas and study halls",
      deliveryFee: 20,
      estimatedTime: "8-12 minutes",
    },
    {
      id: "loc_004",
      name: "Cafeteria Area",
      description: "Student dining and lounge areas",
      deliveryFee: 15,
      estimatedTime: "5-10 minutes",
    },
    {
      id: "loc_005",
      name: "Gymnasium",
      description: "Sports complex and fitness areas",
      deliveryFee: 35,
      estimatedTime: "18-25 minutes",
    },
    {
      id: "loc_006",
      name: "Student Center",
      description: "Activity rooms and offices",
      deliveryFee: 25,
      estimatedTime: "10-15 minutes",
    },
  ],

  // Payment methods
  paymentMethods: [
    {
      id: "pay_001",
      name: "GCash",
      icon: "Ã°Å¸'Â°",
      description: "Digital wallet payment",
      enabled: true,
    },
    {
      id: "pay_002",
      name: "Cash",
      icon: "Ã°Å¸'Âµ",
      description: "Cash on delivery",
      enabled: true,
    },
    {
      id: "pay_003",
      name: "PayMaya",
      icon: "Ã°Å¸'Â³",
      description: "Digital wallet payment",
      enabled: true,
    },
    {
      id: "pay_004",
      name: "Bank Transfer",
      icon: "Ã°Å¸Â¦",
      description: "Online banking transfer",
      enabled: false,
    },
  ],

  // App settings
  appSettings: {
    deliveryHours: {
      start: "08:00",
      end: "20:00",
      timezone: "Asia/Manila",
    },
    minimumOrder: 50,
    maxDeliveryRadius: 2, // kilometers
    supportContact: {
      email: "support@nueats.com",
      phone: "+63 2 1234 5678",
      hours: "8:00 AM - 8:00 PM",
    },
    socialMedia: {
      facebook: "https://facebook.com/nueats",
      instagram: "https://instagram.com/nueats",
      twitter: "https://twitter.com/nueats",
    },
    security: {
      passwordMinLength: 8,
      passwordRequirements: {
        uppercase: true,
        lowercase: true,
        number: true,
        specialChar: true,
      },
      passwordExpiration: 90, // days
      maxLoginAttempts: 5,
      lockoutDuration: 30, // minutes
    },
  },
};

// Helper functions for demo data
export const demoHelpers = {
  // Get user by ID
  getUserById: (userId) => {
    return demoData.users.find((user) => user.id === userId);
  },

  // Get user transactions
  getUserTransactions: (userId) => {
    return demoData.transactions.filter(
      (transaction) => transaction.userId === userId
    );
  },

  // Get food item by ID
  getFoodById: (foodId) => {
    return demoData.menuItems.find((item) => item.id === foodId);
  },

  // Get available food items
  getAvailableFoods: () => {
    return demoData.menuItems.filter((item) => item.available);
  },

  // Get foods by category
  getFoodsByCategory: (category) => {
    return demoData.menuItems.filter((item) => item.category === category);
  },

  // Calculate cart total
  getCartTotal: () => {
    return demoData.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  },

  // Get recent transactions (last 5)
  getRecentTransactions: (userId, limit = 5) => {
    return demoData.transactions
      .filter((transaction) => transaction.userId === userId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  },

  // Search food items
  searchFoods: (query) => {
    const searchTerm = query.toLowerCase();
    return demoData.menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
  },

  // Authenticate user (for demo purposes)
  authenticateUser: (email, password) => {
    const user = demoData.users.find((user) => user.email === email);
    if (user && user.password === password) {
      return {
        success: true,
        user: { ...user, password: undefined }, // Don't return password
        message: "Authentication successful",
      };
    }
    return {
      success: false,
      user: null,
      message: "Invalid email or password",
    };
  },
};

// User Profile Management Functions
export const userProfileManager = {
  // Get current user profile
  getCurrentUser: () => {
    const user = { ...demoData.currentUser };
    delete user.password; // Don't expose password
    return user;
  },

  // Update user profile - basic info
  updateUserProfile: (userId, updates) => {
    try {
      // Validate required fields
      const requiredFields = ["name", "email", "phone"];
      for (const field of requiredFields) {
        if (updates[field] !== undefined && !updates[field].trim()) {
          throw new Error(`${field} is required and cannot be empty`);
        }
      }

      // Validate email format
      if (updates.email && !isValidEmail(updates.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Validate phone format
      if (updates.phone && !isValidPhone(updates.phone)) {
        throw new Error("Please enter a valid phone number");
      }

      // Update current user if it's the current user
      if (userId === demoData.currentUser.id) {
        Object.assign(demoData.currentUser, updates);
        demoData.currentUser.lastUpdated = new Date().toISOString();
      }

      // Update in users array
      const userIndex = demoData.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        Object.assign(demoData.users[userIndex], updates);
      }

      const returnUser =
        userId === demoData.currentUser.id
          ? { ...demoData.currentUser }
          : { ...demoData.users[userIndex] };
      delete returnUser.password; // Don't return password

      return {
        success: true,
        message: "Profile updated successfully",
        user: returnUser,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        user: null,
      };
    }
  },

  // Update user preferences
  updateUserPreferences: (userId, preferences) => {
    try {
      if (userId === demoData.currentUser.id) {
        demoData.currentUser.preferences = {
          ...demoData.currentUser.preferences,
          ...preferences,
        };
        demoData.currentUser.lastUpdated = new Date().toISOString();

        return {
          success: true,
          message: "Preferences updated successfully",
          preferences: { ...demoData.currentUser.preferences },
        };
      }

      throw new Error("User not found");
    } catch (error) {
      return {
        success: false,
        message: error.message,
        preferences: null,
      };
    }
  },

  // Update user address
  updateUserAddress: (userId, address) => {
    try {
      // Validate address fields
      const requiredAddressFields = ["street", "barangay", "city", "province"];
      for (const field of requiredAddressFields) {
        if (!address[field] || !address[field].trim()) {
          throw new Error(`${field} is required`);
        }
      }

      if (userId === demoData.currentUser.id) {
        demoData.currentUser.address = {
          ...demoData.currentUser.address,
          ...address,
        };
        demoData.currentUser.lastUpdated = new Date().toISOString();

        return {
          success: true,
          message: "Address updated successfully",
          address: { ...demoData.currentUser.address },
        };
      }

      throw new Error("User not found");
    } catch (error) {
      return {
        success: false,
        message: error.message,
        address: null,
      };
    }
  },

  // Change user password
  changePassword: (userId, currentPassword, newPassword) => {
    try {
      // Basic password validation
      if (!currentPassword || !newPassword) {
        throw new Error("Both current and new passwords are required");
      }

      if (!isValidPassword(newPassword)) {
        throw new Error(
          "New password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
        );
      }

      // Find user and verify current password
      const user = demoData.users.find((user) => user.id === userId);
      if (!user || user.password !== currentPassword) {
        throw new Error("Current password is incorrect");
      }

      // Update password
      user.password = newPassword;
      user.lastPasswordChange = new Date().toISOString();

      if (userId === demoData.currentUser.id) {
        demoData.currentUser.password = newPassword;
        demoData.currentUser.lastPasswordChange = new Date().toISOString();
        demoData.currentUser.lastUpdated = new Date().toISOString();
      }

      return {
        success: true,
        message: "Password changed successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Delete user account (simulation)
  deleteUserAccount: (userId, password) => {
    try {
      if (!password) {
        throw new Error("Password is required to delete account");
      }

      const user = demoData.users.find((user) => user.id === userId);
      if (!user || user.password !== password) {
        throw new Error("Password is incorrect");
      }

      // In a real app, you would soft delete or mark account as inactive
      console.log(`Account ${userId} would be deleted`);

      return {
        success: true,
        message: "Account deletion initiated. You will be logged out.",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Reset user profile to defaults
  resetProfile: (userId) => {
    if (userId === demoData.currentUser.id) {
      // Reset to original values
      const originalUser = {
        ...demoData.currentUser,
        name: "Alden Richards",
        email: "alden.richards@students.nu.dasma.ph",
        phone: "+63 912 345 6074",
        password: "Alden@123", // Keep original password
        profileImage: null,
        preferences: {
          notifications: true,
          darkMode: false,
          language: "en",
          currency: "PHP",
        },
      };

      Object.assign(demoData.currentUser, originalUser);
      demoData.currentUser.lastUpdated = new Date().toISOString();

      const returnUser = { ...demoData.currentUser };
      delete returnUser.password; // Don't return password

      return {
        success: true,
        message: "Profile reset to default values",
        user: returnUser,
      };
    }

    return {
      success: false,
      message: "User not found",
    };
  },

  // Export user data
  exportUserData: (userId) => {
    if (userId === demoData.currentUser.id) {
      const userData = {
        profile: { ...demoData.currentUser },
        transactions: demoHelpers.getUserTransactions(userId),
        exportDate: new Date().toISOString(),
      };

      // Remove password from exported data
      delete userData.profile.password;

      return {
        success: true,
        message: "User data exported successfully",
        data: userData,
      };
    }

    return {
      success: false,
      message: "User not found",
      data: null,
    };
  },
};

// Validation helper functions
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^(\+63|0)?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
};

const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export default demoData;
