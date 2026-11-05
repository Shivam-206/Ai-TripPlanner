import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function UserTripCarditem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const getPlacePhoto = async () => {
      if (!import.meta.env.VITE_GOOGLE_PLACE_API_KEY) return;

      const destination = trip?.userSelection?.destination;
      if (!destination) return;

      try {
        const response = await GetPlaceDetails({
          textQuery: destination,
        });

        const photoName = response.data?.places?.[0]?.photos?.[0]?.name;

        if (photoName) {
          const url = PHOTO_REF_URL.replace("{NAME}", photoName);
          setPhotoUrl(url);
        }
      } catch (error) {
        console.error("Error fetching destination photo:", error);
      }
    };

    getPlacePhoto();
  }, [trip]);

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl || "/Placeholder2.jpg"}
          alt={trip?.userSelection?.destination || "Trip"}
          className="object-cover rounded-xl h-62.5 w-full"
        />

        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.destination}
          </h2>

          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.days} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCarditem;