import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/service/firebaseConfig";
import { apiRequest } from "@/service/api";
import UserTripCarditem from "./components/UserTripCarditem";

function Mytrips() {
  const navigation = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserTrips = async () => {
      try {
        await auth.authStateReady();
        const user = auth.currentUser;

        if (!user) {
          navigation("/", { replace: true });
          return;
        }

        const trips = await apiRequest("/api/trips");
        if (!Array.isArray(trips) || trips.some((trip) => !trip?.id)) {
          throw new Error("The server returned an invalid trip list.");
        }

        setUserTrips(trips);
      } catch (error) {
        console.error("Error fetching user trips:", error);
        setError(
          error.status === 401
            ? "Your session could not be verified. Please sign out and sign in again."
            : "Unable to load your trips. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    getUserTrips();
  }, [navigation]);

  return (
    <div className="sm:mx-10 md:px-32 lg:px-56 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid mt-10 grid-cols-2 md:grid-cols-3 gap-5">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-62.5 w-full bg-slate-200 animate-pulse rounded-xl"
            />
          ))
        ) : error ? (
          <p className="text-gray-500 col-span-full">{error}</p>
        ) : userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <UserTripCarditem key={trip.id} trip={trip} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            You haven't created any trips yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Mytrips;