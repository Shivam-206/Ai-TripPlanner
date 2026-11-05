import React from "react";

function PlaceCardItem({ place }) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place?.placeName || ""
  )}`;

  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div className="border rounded-xl p-3 mt-2 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">

        <img
          src={place?.placeImageUrl || "/placeholder.jpg"}
          alt={place?.placeName || "Travel destination"}
          className="w-full h-44 rounded-lg object-cover"
        />

        <div className="mt-3 flex flex-col flex-1">
          <h2 className="font-bold text-lg">
            {place?.placeName}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {place?.placeDetails}
          </p>

          <p className="mt-3 text-sm font-medium">
            🕢 {place?.timeToTravel}
          </p>
        </div>

      </div>
    </a>
  );
}

export default PlaceCardItem;