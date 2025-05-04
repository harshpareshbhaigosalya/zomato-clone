import React, { useState, useEffect } from "react";
import Header from "../components/Header";

// 🎁 Dummy Data - Extended for realism
const mockUser = {
  name: "Mr Zomato",
  email: "zomato@abc.com",
  avatar:
    "https://b.zmtcdn.com/data/o2_assets/d1eee2be61cf47e2332cb7c49475c0981739777714.png",
  followers: 127,
  following: 89,
  addresses: ["Home", "Work", "Parents' House"],
  reviews: [
    {
      id: 1,
      dish: "Paneer Butter Masala",
      rating: 5,
      comment: "Absolutely delicious! Creamy texture and perfect spices.",
      date: "2024-08-05",
    },
    {
      id: 2,
      dish: "Hyderabadi Biryani",
      rating: 4,
      comment: "Great biryani but could be a bit spicier!",
      date: "2024-08-03",
    },
    {
      id: 3,
      dish: "Masala Dosa",
      rating: 5,
      comment: "Best dosa I've had in Bangalore. Crispy and flavorful.",
      date: "2024-08-01",
    },
  ],
  photos: [
    "https://source.unsplash.com/random/300x200?sig=1",
    "https://source.unsplash.com/random/300x200?sig=2",
    "https://source.unsplash.com/random/300x200?sig=3",
    "https://source.unsplash.com/random/300x200?sig=4",
  ],
  orders: [
    {
      id: 1,
      dish: "Paneer Tikka",
      status: "Delivered",
      restaurant: "Spice Garden",
      date: "2024-08-06 at 12:30 PM",
    },
    {
      id: 2,
      dish: "Veggie Pizza",
      status: "On the Way",
      restaurant: "Pizza Planet",
      date: "2024-08-07 at 7:15 PM",
    },
    {
      id: 3,
      dish: "Chole Bhature",
      status: "Pending",
      restaurant: "Punjabi Delights",
      date: "2024-08-08 at 8:00 AM",
    },
  ],
  bookings: [
    {
      id: 1,
      restaurant: "The Seafood Place",
      time: "2024-08-10 at 8:00 PM",
      guests: 4,
    },
    {
      id: 2,
      restaurant: "Skyline Rooftop Lounge",
      time: "2024-08-12 at 7:00 PM",
      guests: 2,
    },
  ],
  bookmarks: [
    {
      id: 1,
      dish: "Paneer Tikka",
      image: "https://via.placeholder.com/300x200?text=Paneer+Tikka",
    },
    {
      id: 2,
      dish: "Cheeseburger",
      image: "https://via.placeholder.com/300x200?text=Cheese+Burger",
    },
    {
      id: 3,
      dish: "Margherita Pizza",
      image: "https://via.placeholder.com/300x200?text=Pizza",
    },
  ],
  blogPosts: [
    {
      id: 1,
      title: "Top 5 Healthy Food Options on Zomato",
      content:
        "I'm always trying to eat healthy while still enjoying my meals...",
    },
    {
      id: 2,
      title: "How I Stay Fit While Ordering Delivery Every Day",
      content:
        "Yes, you can stay fit and enjoy food delivery! Here’s how I do it...",
    },
  ],
};

// 📝 Sections Mapping
const sections = {
  REVIEWS: "reviews",
  PHOTOS: "photos",
  ORDER_HISTORY: "order-history",
  MY_ADDRESS: "my-address",
  BOOKINGS: "bookings",
  BOOKMARKS: "bookmarks",
  BLOG_POSTS: "blog-posts",
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(sections.REVIEWS);
  const [currComp, setCurrComp] = useState(null);

  // 💡 UseEffect to render dynamic components based on activeTab
  useEffect(() => {
    switch (activeTab) {
      case sections.REVIEWS:
        setCurrComp(
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Your Reviews</h3>
            {mockUser.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-5 rounded-lg shadow-md transition-transform hover:-translate-y-1 duration-200"
              >
                <div className="flex items-center mb-3">
                  <img
                    src={mockUser.avatar}
                    alt="User"
                    className="w-10 h-10 rounded-full mr-3 border-2 border-red-500"
                  />
                  <div className="text-left">
                    <p className="font-semibold">{mockUser.name}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <h4 className="font-medium text-lg">{review.dish}</h4>
                <div className="mt-1 flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      } text-xl`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        );
        break;

      case sections.PHOTOS:
        setCurrComp(
          <div>
            <h3 className="text-xl font-bold mb-4">Your Photos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mockUser.photos.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`user-${idx}`}
                  className="w-full h-32 object-cover rounded-lg shadow-sm"
                />
              ))}
            </div>
          </div>
        );
        break;

      case sections.ORDER_HISTORY:
        setCurrComp(
          <div>
            <h3 className="text-xl font-bold mb-4">Order History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 text-left text-gray-600">Dish</th>
                    <th className="py-2 text-left text-gray-600">Restaurant</th>
                    <th className="py-2 text-left text-gray-600">Status</th>
                    <th className="py-2 text-left text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUser.orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b py-2 hover:bg-gray-50"
                    >
                      <td className="py-3 font-medium">{order.dish}</td>
                      <td className="py-3">{order.restaurant}</td>
                      <td
                        className={`py-3 ${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </td>
                      <td className="py-3">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        break;

      case sections.MY_ADDRESS:
        setCurrComp(
          <div>
            <h3 className="text-xl font-bold mb-4">Saved Addresses</h3>
            <ul className="space-y-3">
              {mockUser.addresses.map((addr, i) => (
                <li
                  key={i}
                  className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <span>{addr}</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
        break;

      case sections.BOOKINGS:
        setCurrComp(
          <div>
            <h3 className="text-xl font-bold mb-4">Table Bookings</h3>
            <div className="space-y-4">
              {mockUser.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h4 className="font-semibold text-lg">
                    {booking.restaurant}
                  </h4>
                  <p className="text-sm text-gray-600">
                    For {booking.guests} people
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{booking.time}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case sections.BOOKMARKS:
        setCurrComp(
          <div>
            <h3 className="text-xl font-bold mb-4">Bookmarked Dishes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mockUser.bookmarks.map((dish) => (
                <div
                  key={dish.id}
                  className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <img
                    src={dish.image}
                    alt={dish.name || "Dish"}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="font-medium">{dish.dish}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case sections.BLOG_POSTS:
        setCurrComp(
          <div>
            <h3 className="text-xl font-bold mb-4">Your Blog Posts</h3>
            <div className="space-y-5">
              {mockUser.blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-5 rounded-lg shadow-md"
                >
                  <h4 className="font-semibold text-lg">{post.title}</h4>
                  <p className="mt-2 text-gray-700">{post.content}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      default:
        setCurrComp(
          <div className="text-center py-10">
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Nothing to show here
            </h3>
            <p className="text-gray-500">Select a tab to view your activity</p>
          </div>
        );
    }
  }, [activeTab]);

  return (
    <>
      <Header />

      {/* Profile Summary */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-6">
            <img
              src={mockUser.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-red-500 shadow-md"
            />
            <div className="ml-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {mockUser.name}
              </h2>
              <p className="text-gray-600">{mockUser.email}</p>
              <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                <span>
                  Followers: <strong>{mockUser.followers}</strong>
                </span>
                <span>
                  Following: <strong>{mockUser.following}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center mb-8">
            <button
              onClick={() => setActiveTab(sections.REVIEWS)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                activeTab === sections.REVIEWS
                  ? "bg-red-100 text-red-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="text-2xl font-bold text-red-600">
                {mockUser.reviews.length}
              </p>
              <p className="text-blue-600 hover:underline">Reviews</p>
            </button>
            <button
              onClick={() => setActiveTab(sections.PHOTOS)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                activeTab === sections.PHOTOS
                  ? "bg-red-100 text-red-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="text-2xl font-bold text-red-600">
                {mockUser.photos.length}
              </p>
              <p className="text-blue-600 hover:underline">Photos</p>
            </button>
            <button
              onClick={() => setActiveTab(sections.ORDER_HISTORY)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                activeTab === sections.ORDER_HISTORY
                  ? "bg-red-100 text-red-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="text-2xl font-bold text-red-600">
                {mockUser.orders.length}
              </p>
              <p className="text-blue-600 hover:underline">Orders</p>
            </button>
            <button
              onClick={() => setActiveTab(sections.BOOKINGS)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                activeTab === sections.BOOKINGS
                  ? "bg-red-100 text-red-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="text-2xl font-bold text-red-600">
                {mockUser.bookings.length}
              </p>
              <p className="text-blue-600 hover:underline">Reservations</p>
            </button>
            <button
              onClick={() => setActiveTab(sections.BOOKMARKS)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                activeTab === sections.BOOKMARKS
                  ? "bg-red-100 text-red-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="text-2xl font-bold text-red-600">
                {mockUser.bookmarks.length}
              </p>
              <p className="text-blue-600 hover:underline">Favorites</p>
            </button>
            <button
              onClick={() => setActiveTab(sections.BLOG_POSTS)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                activeTab === sections.BLOG_POSTS
                  ? "bg-red-100 text-red-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="text-2xl font-bold text-red-600">
                {mockUser.blogPosts.length}
              </p>
              <p className="text-blue-600 hover:underline">Blog Posts</p>
            </button>
          </div>

          {/* Section Content */}
          <div className="mt-6">{currComp}</div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
