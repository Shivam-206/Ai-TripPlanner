import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  useEffect(() => {
    const getPlacePhoto = async () => {
      // Don't make an API request until the key is configured
      if (!import.meta.env.VITE_GOOGLE_PLACE_API_KEY) return;

      const destination = trip?.userSelection?.destination;

      if (!destination) return;

      try {
        const response = await GetPlaceDetails({
          textQuery: destination,
        });

        const photoName = response.data?.places?.[0]?.photos?.[0]?.name;

        if (photoName) {
          const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
          setPhotoUrl(photoUrl);
        }
      } catch (error) {
        console.error("Error fetching destination photo:", error);
      }
    };

    if (trip) {
      getPlacePhoto();
    }
  }, [trip]);

  return (
    <div>
      <img
        src={photoUrl || "/Placeholder2.jpg"}
        className="h-[340px] w-full object-cover rounded-[30px]"
        alt="Trip preview"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.destination}
          </h2>

          <div className="flex gap-5 flex-wrap">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              📅 {trip?.userSelection?.days} Days
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              🥂 No. of travelers: {trip?.userSelection?.travelers}
            </h2>
          </div>
        </div>

        <Button onClick={handleShare}>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;