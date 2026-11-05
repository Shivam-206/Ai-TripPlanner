import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function HotelCarditem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const getPlacePhoto = async () => {
      // Don't call Google API until the key is configured
      if (!import.meta.env.VITE_GOOGLE_PLACE_API_KEY) return;

      if (!hotel?.hotelName) return;

      try {
        const data = {
          textQuery: hotel.hotelName,
        };

        const response = await GetPlaceDetails(data);

        const photoName = response.data?.places?.[0]?.photos?.[0]?.name;

        if (photoName) {
          const url = PHOTO_REF_URL.replace("{NAME}", photoName);
          setPhotoUrl(url);
        }
      } catch (error) {
        console.error("Error fetching hotel photo:", error);
      }
    };

    getPlacePhoto();
  }, [hotel]);

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hotel?.hotelName || ""}, ${hotel?.hotelAddress || ""}`,
  )}`;

  return (
    <div>
      <Link
        to={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="hover:scale-105 transition-all cursor-pointer">
          <img
            src={photoUrl || "/Placeholder2.jpg"}
            className="rounded-xl w-full h-48 object-cover"
            alt={hotel?.hotelName || "Hotel"}
          />

          <div className="my-2 flex flex-col gap-2">
            <h2 className="font-medium">{hotel?.hotelName}</h2>

            <h2 className="text-xs text-gray-500">
              📍 {hotel?.hotelAddress}
            </h2>

            <h2 className="text-sm">🏷️ {hotel?.price}</h2>

            <h2 className="text-sm">⭐ {hotel?.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCarditem;