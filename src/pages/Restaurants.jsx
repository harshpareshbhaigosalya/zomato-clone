import RestaurantCard from "../components/RestaurantCard";

const mockRestaurants = [
  {
    id: 1,
    name: "Tasty Bites",
    cuisine: "North Indian",
    rating: 4.5,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Green Garden Cafe",
    cuisine: "Healthy Salads",
    rating: 4.7,
    image: "https://via.placeholder.com/300x200",
  },
];

const Restaurants = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Top Restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRestaurants.map((res) => (
          <RestaurantCard key={res.id} restaurant={res} />
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
