import React from "react";
import HotelCarditem from "./HotelCarditem";

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotels || [];

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">
        Hotels Recommendation
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {hotels.map((hotel, index) => (
          <HotelCarditem
            key={`${hotel?.hotelName || "hotel"}-${index}`}
            hotel={hotel}
          />
        ))}
      </div>

      {hotels.length === 0 && (
        <p className="text-gray-500 mt-3">
          No hotel recommendations available.
        </p>
      )}
    </div>
  );
}

export default Hotels;