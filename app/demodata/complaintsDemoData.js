// User-side complaints demo data
// This simulates complaints from the user's perspective
const userComplaintsDemoData = [
  {
    complaint_id: "COMP-001",
    customer_id: "user_001", // CHANGED: Updated to match profileDemoData format
    title: "App keeps freezing during payment",
    description:
      "Every time I try to pay for my order, the app freezes and I have to restart it. This has happened 3 times this week.",
    category: "App Issue",
    status: "open",
    created_date: "2024-01-08T10:30:00Z",
    updated_date: "2024-01-08T10:30:00Z",
    resolved_date: null,
    admin_response: null,
  },
  {
    complaint_id: "COMP-009",
    customer_id: "user_001", // CHANGED: Updated to match profileDemoData format
    title: "Food arrived cold and soggy",
    description:
      "My pizza arrived completely cold and the fries were soggy. Very disappointing for the price I paid.",
    category: "Food Quality",
    status: "resolved",
    created_date: "2024-01-06T18:45:00Z",
    updated_date: "2024-01-07T14:20:00Z",
    resolved_date: "2024-01-07T14:20:00Z",
    admin_response: {
      response_id: "RESP-004",
      admin_name: "Customer Support Team",
      response_text:
        "We sincerely apologize for the poor quality of your order. We have processed a full refund and have spoken with the restaurant about their food preparation standards. We've also added a credit to your account for your next order.",
      response_date: "2024-01-07T14:20:00Z",
    },
  },
  {
    complaint_id: "COMP-010",
    customer_id: "user_001", // CHANGED: Updated to match profileDemoData format
    title: "Delivery driver couldn't find my address",
    description:
      "The driver called me 5 times saying he couldn't find my address even though I provided clear directions and my address is clearly marked.",
    category: "Service",
    status: "resolved",
    created_date: "2024-01-05T19:20:00Z",
    updated_date: "2024-01-06T09:15:00Z",
    resolved_date: "2024-01-06T09:15:00Z",
    admin_response: {
      response_id: "RESP-005",
      admin_name: "Customer Support Team",
      response_text:
        "Thank you for your patience. We have updated our GPS system with better address mapping for your area and provided additional training to our drivers. We apologize for the inconvenience and have applied a delivery credit to your account.",
      response_date: "2024-01-06T09:15:00Z",
    },
  },
  {
    complaint_id: "COMP-011",
    customer_id: "user_001", // CHANGED: Updated to match profileDemoData format
    title: "Wrong order delivered",
    description:
      "I ordered a vegetarian pizza but received a pepperoni pizza. I'm vegetarian so I couldn't eat it.",
    category: "Service",
    status: "open",
    created_date: "2024-01-08T20:15:00Z",
    updated_date: "2024-01-08T20:15:00Z",
    resolved_date: null,
    admin_response: null,
  },
  {
    complaint_id: "COMP-012",
    customer_id: "user_001", // CHANGED: Updated to match profileDemoData format
    title: "Charged for items I didn't order",
    description:
      "My bill shows extra items that I never added to my cart. Please check and refund the difference.",
    category: "Billing",
    status: "open",
    created_date: "2024-01-08T15:30:00Z",
    updated_date: "2024-01-08T15:30:00Z",
    resolved_date: null,
    admin_response: null,
  },
  {
    complaint_id: "COMP-013",
    customer_id: "user_001", // CHANGED: Updated to match profileDemoData format
    title: "Long pickup wait time",
    description:
      "I was told my order would be ready in 15 minutes but had to wait 45 minutes at the store. No explanation was given.",
    category: "Pickup Delay",
    status: "resolved",
    created_date: "2024-01-04T12:30:00Z",
    updated_date: "2024-01-05T10:45:00Z",
    resolved_date: "2024-01-05T10:45:00Z",
    admin_response: {
      response_id: "RESP-006",
      admin_name: "Customer Support Team",
      response_text:
        "We apologize for the extended wait time. The restaurant was experiencing high order volumes that day. We have improved our time estimation system and will provide better updates to customers about delays. Thank you for your patience.",
      response_date: "2024-01-05T10:45:00Z",
    },
  },
  // Added a few more complaints for other users for testing
  {
    complaint_id: "COMP-014",
    customer_id: "user_002", // Maine Mendoza's complaint
    title: "App crashes when adding items to cart",
    description:
      "The app keeps crashing whenever I try to add more than 2 items to my cart. Very frustrating!",
    category: "App Issue",
    status: "pending",
    created_date: "2024-01-07T16:20:00Z",
    updated_date: "2024-01-07T16:20:00Z",
    resolved_date: null,
    admin_response: null,
  },
];

// Helper functions for user complaints
export const userComplaintsHelpers = {
  // Get all complaints for a specific user
  getUserComplaints: (userId) => {
    console.log("Searching for complaints with userId:", userId); // DEBUG LINE
    const userComplaints = userComplaintsDemoData.filter(
      (complaint) => complaint.customer_id === userId
    );
    console.log("Found complaints:", userComplaints.length); // DEBUG LINE
    return userComplaints;
  },

  // Filter complaints by status
  filterByStatus: (complaints, status) => {
    if (status === "all") return complaints;
    return complaints.filter((complaint) => complaint.status === status);
  },

  // Filter complaints by category
  filterByCategory: (complaints, category) => {
    if (category === "all") return complaints;
    return complaints.filter((complaint) => complaint.category === category);
  },

  // Get complaint by ID
  getComplaintById: (complaintId) => {
    return userComplaintsDemoData.find(
      (complaint) => complaint.complaint_id === complaintId
    );
  },

  // Get complaint statistics for user
  getComplaintStats: (userId) => {
    const userComplaints = userComplaintsDemoData.filter(
      (complaint) => complaint.customer_id === userId
    );
    return {
      total: userComplaints.length,
      open: userComplaints.filter((c) => c.status === "open").length,
      resolved: userComplaints.filter((c) => c.status === "resolved").length,
      pending: userComplaints.filter((c) => c.status === "pending").length,
    };
  },

  // Format date for display
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  // Get status color
  getStatusColor: (status) => {
    switch (status) {
      case "open":
        return "#ff6b6b"; // Red
      case "resolved":
        return "#51cf66"; // Green
      case "pending":
        return "#ffd43b"; // Yellow
      default:
        return "#868e96"; // Gray
    }
  },

  // Get category icon
  getCategoryIcon: (category) => {
    switch (category) {
      case "Food Quality":
        return "restaurant-outline";
      case "Service":
        return "people-outline";
      case "App Issue":
        return "phone-portrait-outline";
      case "Billing":
        return "card-outline";
      case "Pickup Delay":
        return "time-outline";
      default:
        return "chatbubble-outline";
    }
  },
};

export default userComplaintsDemoData;
