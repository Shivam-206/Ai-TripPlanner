import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { auth } from "@/service/firebaseConfig";
import UserTripCarditem from "./components/UserTripCarditem";

function Mytrips() {
  const navigation = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUsertrips();
  }, []);

  const GetUsertrips = async () => {
    try {
      await auth.authStateReady();
      const user = auth.currentUser;

      if (!user) {
        navigation("/");
        return;
      }

      const q = query(
        collection(db, "AITrips"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);

      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching user trips:", error);
    } finally {
      setLoading(false);
    }
  };

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