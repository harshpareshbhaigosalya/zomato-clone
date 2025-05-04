const RestaurantCard = ({ restaurant }) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{restaurant.name}</h2>
          <p className="text-gray-600">{restaurant.cuisine}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">⭐</span>
            <span className="ml-1 font-medium">{restaurant.rating}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default RestaurantCard;