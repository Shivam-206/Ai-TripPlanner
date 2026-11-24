import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  const itinerary = Array.isArray(trip?.tripData?.itinerary)
    ? trip.tripData.itinerary
    : [];

  return (
    <div className="mt-8">
      <h2 className="font-bold text-xl mb-5">
        Places To Visit
      </h2>

      <div className="space-y-8">
        {itinerary.map((item, index) => {
          const places = Array.isArray(item?.places) ? item.places : [];
          const day = item?.day ?? index + 1;

          return (
            <div key={`${day}-${index}`}>
              <h2 className="mb-4 border-l-4 border-orange-500 pl-3 text-lg font-bold">
                Day {day}
              </h2>

              {places.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {places.map((place, placeIndex) => (
                    <div key={placeIndex} className="min-w-0">
                      {place?.time && (
                        <h2 className="mb-2 break-words text-sm font-medium text-orange-600">
                          {place.time}
                        </h2>
                      )}

                      <PlaceCardItem
                        place={place}
                        destination={trip?.userSelection?.destination}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No places listed for this day.</p>
              )}
            </div>
          );
        })}
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