import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlacePhoto } from "@/service/GlobalApi";

function UserTripCarditem({ trip }) {
  const [photo, setPhoto] = useState({ query: "", url: "" });
  const destination = trip?.userSelection?.destination || "";

  useEffect(() => {
    let active = true;

    GetPlacePhoto(destination)
      .then((url) => {
        if (active && url) setPhoto({ query: destination, url });
      })
      .catch((error) => {
        console.error("Error fetching destination photo:", error);
      });

    return () => {
      active = false;
    };
  }, [destination]);

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all">
        <img
          src={(photo.query === destination && photo.url) || "/Placeholder2.jpg"}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/Placeholder2.jpg";
          }}
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