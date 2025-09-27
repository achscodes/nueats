// demoTransactionData.js
// Demo transaction data for Transactions screen
// Updated to use products from menuDemoData.js

const demoTransactionData = [
  {
    id: "1",
    orderNumber: "NU-2024-001",
    date: "2024-03-15",
    status: "Completed",
    items: [
      {
        name: "Adobo",
        quantity: 2,
        price: 120,
        image:
          "https://assets.bonappetit.com/photos/60419b8c970fc321b2086e48/1:1/w_1124,h_1124,c_limit/GO-Live-Pineapple-Pork-3.jpg",
      },
      {
        name: "Halo-Halo",
        quantity: 1,
        price: 120,
        image:
          "https://pilipinasrecipes.com/wp-content/uploads/2018/03/Filipino-Halo-Halo-Recipe.jpg",
      },
    ],
    total: 360,
    paymentMethod: "GCash",
    deliveryAddress: "Room 301, Main Building, NU Dasmariñas",
    time: "12:42 PM",
  },
  {
    id: "2",
    orderNumber: "NU-2024-002",
    date: "2024-03-12",
    status: "Completed",
    items: [
      {
        name: "Chicken Wings",
        quantity: 1,
        price: 120,
        image:
          "https://asset.homechef.com/uploads/meal/plated/2705/homechef_Sambal_Chicken_Wings_Reshoot__2_of_3_.jpg",
      },
      {
        name: "Lumpia Shanghai",
        quantity: 2,
        price: 80,
        image:
          "https://graceland.ph/wp-content/uploads/2023/05/LUMPIA-SHANGHAI.jpg",
      },
    ],
    total: 280,
    paymentMethod: "Cash",
    deliveryAddress: "Library, 2nd Floor, NU Dasmariñas",
    time: "2:35 PM",
  },
  {
    id: "3",
    orderNumber: "NU-2024-003",
    date: "2024-03-10",
    status: "Cancelled",
    items: [
      {
        name: "Kare-Kare",
        quantity: 1,
        price: 180,
        image:
          "https://www.kawalingpinoy.com/wp-content/uploads/2014/01/kare-kare-with-oxtail-2.jpg",
      },
    ],
    total: 180,
    paymentMethod: "Maya",
    deliveryAddress: "Dormitory, NU Dasmariñas",
    time: "11:00 AM",
  },
  {
    id: "4",
    orderNumber: "NU-2024-004",
    date: "2024-03-08",
    status: "Pending",
    items: [
      {
        name: "Lechon Kawali",
        quantity: 1,
        price: 250,
        image:
          "https://images.yummy.ph/yummy/uploads/2021/06/spicylechonkawalirecipe-web.jpg",
      },
      {
        name: "Sinigang",
        quantity: 1,
        price: 150,
        image:
          "https://charisseyu.com/wp-content/uploads/2023/12/IMG_0135-scaled.jpg",
      },
    ],
    total: 400,
    paymentMethod: "GCash",
    deliveryAddress: "Room 101, Main Building, NU Dasmariñas",
    time: "5:15 PM",
  },
  {
    id: "5",
    orderNumber: "NU-2024-005",
    date: "2024-03-05",
    status: "Completed",
    items: [
      {
        name: "Beef Caldereta",
        quantity: 1,
        price: 200,
        image:
          "https://images.yummy.ph/yummy/uploads/2019/08/beefkaldereta-640-1.jpg",
      },
      {
        name: "Fresh Buko Juice",
        quantity: 2,
        price: 60,
        image:
          "https://i.pinimg.com/736x/f5/7b/9c/f57b9c002ba6c57f8267b5f747efabfd.jpg",
      },
    ],
    total: 320,
    paymentMethod: "Cash",
    deliveryAddress: "Gymnasium, NU Dasmariñas",
    time: "9:30 AM",
  },
  {
    id: "6",
    orderNumber: "NU-2024-006",
    date: "2024-03-02",
    status: "Completed",
    items: [
      {
        name: "Chicken Inasal",
        quantity: 1,
        price: 160,
        image:
          "https://cdn.sanity.io/images/f3knbc2s/production/19481ad7bcff23ce2904eeb435f5ddc2c05df796-2500x1600.jpg",
      },
      {
        name: "Leche Flan",
        quantity: 2,
        price: 80,
        image:
          "https://www.kawalingpinoy.com/wp-content/uploads/2017/04/whole-eggs-leche-flan-2.jpg",
      },
    ],
    total: 320,
    paymentMethod: "Maya",
    deliveryAddress: "Cafeteria, NU Dasmariñas",
    time: "3:20 PM",
  },
  {
    id: "7",
    orderNumber: "NU-2024-007",
    date: "2024-02-28",
    status: "Completed",
    items: [
      {
        name: "Kwek-Kwek",
        quantity: 3,
        price: 50,
        image:
          "https://eggsallways.com/wp-content/uploads/2025/05/kwek-kwek-10-320x480.jpg",
      },
      {
        name: "Calamansi Juice",
        quantity: 1,
        price: 45,
        image:
          "https://www.kawalingpinoy.com/wp-content/uploads/2013/05/calamansi-juice.jpg",
      },
    ],
    total: 195,
    paymentMethod: "GCash",
    deliveryAddress: "Student Lounge, NU Dasmariñas",
    time: "1:15 PM",
  },
  {
    id: "8",
    orderNumber: "NU-2024-008",
    date: "2024-02-25",
    status: "Completed",
    items: [
      {
        name: "Cheese Sticks",
        quantity: 1,
        price: 90,
        image:
          "https://i0.wp.com/www.angsarap.net/wp-content/uploads/2014/01/cheese-sticks-wide.jpg?ssl=1",
      },
      {
        name: "Iced Coffee",
        quantity: 1,
        price: 75,
        image: "https://www.pamperedchef.com/iceberg/com/recipe/2132087-lg.jpg",
      },
      {
        name: "Ube Ice Cream",
        quantity: 1,
        price: 65,
        image: "https://zhangcatherine.com/wp-content/uploads/2021/09/be.jpg",
      },
    ],
    total: 230,
    paymentMethod: "Cash",
    deliveryAddress: "Computer Laboratory, NU Dasmariñas",
    time: "4:45 PM",
  },
  {
    id: "9",
    orderNumber: "NU-2024-009",
    date: "2024-02-22",
    status: "Completed",
    items: [
      {
        name: "Mango Shake",
        quantity: 2,
        price: 85,
        image:
          "https://tastyoven.com/wp-content/uploads/2022/06/mango-shake-image.jpeg",
      },
      {
        name: "Biko",
        quantity: 3,
        price: 55,
        image:
          "https://www.kawalingpinoy.com/wp-content/uploads/2018/09/bibingkang-malagkit-11-500x500.jpg",
      },
    ],
    total: 335,
    paymentMethod: "Maya",
    deliveryAddress: "Faculty Office, NU Dasmariñas",
    time: "10:20 AM",
  },
  {
    id: "10",
    orderNumber: "NU-2024-010",
    date: "2024-02-20",
    status: "Processing",
    items: [
      {
        name: "Adobo",
        quantity: 1,
        price: 120,
        image:
          "https://assets.bonappetit.com/photos/60419b8c970fc321b2086e48/1:1/w_1124,h_1124,c_limit/GO-Live-Pineapple-Pork-3.jpg",
      },
      {
        name: "Sinigang",
        quantity: 1,
        price: 150,
        image:
          "https://charisseyu.com/wp-content/uploads/2023/12/IMG_0135-scaled.jpg",
      },
      {
        name: "Fresh Buko Juice",
        quantity: 1,
        price: 60,
        image:
          "https://i.pinimg.com/736x/f5/7b/9c/f57b9c002ba6c57f8267b5f747efabfd.jpg",
      },
    ],
    total: 330,
    paymentMethod: "GCash",
    deliveryAddress: "Room 205, Science Building, NU Dasmariñas",
    time: "6:30 PM",
  },
];

export default demoTransactionData;
