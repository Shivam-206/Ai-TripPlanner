import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary || [];

  return (
    <div className="mt-8">
      <h2 className="font-bold text-xl mb-5">
        Places To Visit
      </h2>

      <div className="space-y-8">
        {itinerary.map((item, index) => (
          <div key={index}>
            {/* Day heading */}
            <h2 className="font-bold text-lg mb-4 border-l-4 border-orange-500 pl-3">
              Day {item.day}
            </h2>

            {/* Places grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {item.places?.map((place, placeIndex) => (
                <div key={placeIndex}>
                  <h2 className="font-medium text-sm text-orange-600 mb-2">
                    {place.time}
                  </h2>

                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {itinerary.length === 0 && (
        <p className="text-gray-500 mt-3">
          No itinerary available.
        </p>
      )}
    </div>
  );
}

export default PlacesToVisit;