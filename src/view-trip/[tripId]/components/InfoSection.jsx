import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { GetPlacePhoto } from "@/service/GlobalApi";
import { toast } from "sonner";

function InfoSection({ trip }) {
  const [photo, setPhoto] = useState({ query: "", url: "" });
  const destination =
    typeof trip?.userSelection?.destination === "string"
      ? trip.userSelection.destination
      : "";
  const tripName =
    typeof trip?.tripData?.tripName === "string"
      ? trip.tripData.tripName.trim()
      : "";

  const handleShare = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard access is unavailable.");
      }

      await navigator.clipboard.writeText(window.location.href);
      toast.success("Trip link copied.");
    } catch (error) {
      console.error("Could not copy trip link:", error);
      toast.error("Unable to copy the trip link.");
    }
  };

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
    <div>
      <img
        src={(photo.query === destination && photo.url) || "/Placeholder2.jpg"}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = "/Placeholder2.jpg";
        }}
        className="h-[340px] w-full object-cover rounded-[30px]"
        alt="Trip preview"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="my-5 flex min-w-0 flex-col gap-2">
          <h2 className="break-words font-bold text-2xl">
            {tripName || destination || "Trip details"}
          </h2>
          {tripName && destination && tripName !== destination && (
            <p className="break-words text-gray-600">{destination}</p>
          )}

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

        <Button
          onClick={handleShare}
          aria-label="Copy trip link"
          title="Copy trip link"
          className="self-start"
        >
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;