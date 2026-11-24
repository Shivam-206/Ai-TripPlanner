import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "@/service/api";
import { toast } from "sonner";

import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "./components/Footer";

function getErrorMessage(error) {
  switch (error?.status) {
    case 400:
      return "This trip link contains an invalid trip ID.";
    case 401:
      return "Your session could not be verified. Sign out and sign in again.";
    case 403:
      return "You do not have permission to view this trip.";
    case 404:
      return "Trip not found, or you do not have access to it.";
    case 422:
      return "Trip details are incomplete and cannot be displayed.";
    default:
      return "Unable to load trip details. Please try again.";
  }
}

function Viewtrip() {
  const { tripId } = useParams();
  const [tripResult, setTripResult] = useState(null);
  const validTripId = /^[a-f\d]{24}$/i.test(tripId || "");

  useEffect(() => {
    let active = true;

    if (!validTripId) {
      return () => {
        active = false;
      };
    }

    const loadTripData = async () => {
      try {
        const trip = await apiRequest(
          `/api/trips/${encodeURIComponent(tripId)}`,
        );
        if (
          !trip ||
          typeof trip !== "object" ||
          !trip.userSelection ||
          !trip.tripData
        ) {
          throw Object.assign(new Error("Trip response is incomplete"), {
            status: 422,
          });
        }

        if (active) {
          setTripResult({ tripId, trip, error: null });
        }
      } catch (error) {
        if (active) {
          console.error("Error fetching trip:", error);
          setTripResult({ tripId, trip: null, error });
          toast.error(getErrorMessage(error));
        }
      }
    };

    loadTripData();

    return () => {
      active = false;
    };
  }, [tripId, validTripId]);

  const hasCurrentResult = tripResult?.tripId === tripId;
  const loading = validTripId && !hasCurrentResult;
  const trip = loading || !validTripId ? null : tripResult?.trip;
  const error = !validTripId
    ? { status: 400 }
    : loading
      ? null
      : tripResult?.error;

  return (
    <main className="px-4 py-6 sm:p-10 md:px-20 lg:px-44 xl:px-56">
      <Link
        to="/my-trips"
        className="mb-5 inline-flex rounded-md text-sm text-gray-600 hover:text-gray-900"
      >
        ← Back to My Trips
      </Link>

      {loading ? (
        <div role="status" className="p-6 text-center">
          Loading trip details...
        </div>
      ) : error ? (
        <div role="alert" className="py-6 text-center">
          <p className="text-gray-600">{getErrorMessage(error)}</p>
        </div>
      ) : trip ? (
        <>
          <InfoSection trip={trip} />
          <Hotels trip={trip} />
          <PlacesToVisit trip={trip} />
          <Footer trip={trip} />
        </>
      ) : (
        <div role="alert" className="py-6 text-center">
          <p className="text-gray-600">Trip details are unavailable.</p>
        </div>
      )}
    </main>
  );
}

export default Viewtrip;
