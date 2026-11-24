function PlaceCardItem({ place, destination }) {
  const mapQuery = [place?.placeName, destination].filter(Boolean).join(", ");
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapQuery
  )}`;

  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full min-w-0"
    >
      <div className="mt-2 flex h-full min-w-0 cursor-pointer flex-col rounded-xl border p-3 transition-all hover:-translate-y-1 hover:shadow-md">

        <img
          src={place?.placeImageUrl || "/Placeholder2.jpg"}
          alt={place?.placeName || "Travel destination"}
          className="w-full h-44 rounded-lg object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/Placeholder2.jpg";
          }}
        />

        <div className="mt-3 flex min-w-0 flex-1 flex-col">
          <h2 className="break-words font-bold text-lg">
            {place?.placeName || "Recommended place"}
          </h2>

          <p className="mt-2 break-words text-sm text-gray-500">
            {place?.placeDetails || "Details unavailable."}
          </p>

          {place?.timeToTravel && (
            <p className="mt-3 break-words text-sm font-medium">
              🕢 {place.timeToTravel}
            </p>
          )}

          {place?.ticketPricing && (
            <p className="mt-2 break-words text-sm">
              🎟️ {place.ticketPricing}
            </p>
          )}
        </div>

      </div>
    </a>
  );
}

export default PlaceCardItem;