import { useEffect, useState } from "react";
import { GetPlacePhoto } from "@/service/GlobalApi";

function HotelCarditem({ hotel }) {
  const [photo, setPhoto] = useState({ query: "", url: "" });
  const name =
    typeof hotel?.hotelName === "string" ? hotel.hotelName.trim() : "";
  const address =
    typeof hotel?.hotelAddress === "string" ? hotel.hotelAddress.trim() : "";
  const query = [name, address].filter(Boolean).join(", ");

  useEffect(() => {
    let active = true;

    GetPlacePhoto(query)
      .then((url) => {
        if (active && url) setPhoto({ query, url });
      })
      .catch((error) => {
        console.error("Error fetching hotel photo:", error);
      });

    return () => {
      active = false;
    };
  }, [query]);

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <a
      href={query ? mapUrl : undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="block min-w-0"
      aria-label={name ? `View ${name} on Google Maps` : "View hotel on Google Maps"}
    >
      <div className="h-full min-w-0 cursor-pointer transition-all hover:scale-105">
        <img
          src={(photo.query === query && photo.url) || "/Placeholder2.jpg"}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/Placeholder2.jpg";
          }}
          className="h-48 w-full rounded-xl object-cover"
          alt={name || "Hotel"}
        />

        <div className="my-2 flex min-w-0 flex-col gap-2">
          <h2 className="break-words font-medium">
            {name || "Hotel recommendation"}
          </h2>

          <p className="break-words text-xs text-gray-500">
            📍 {address || "Address unavailable"}
          </p>

          <p className="break-words text-sm">
            🏷️ {hotel?.price || "Price unavailable"}
          </p>

          <p className="break-words text-sm">
            ⭐ {hotel?.rating || "Rating unavailable"}
          </p>
        </div>
      </div>
    </a>
  );
}

export default HotelCarditem;