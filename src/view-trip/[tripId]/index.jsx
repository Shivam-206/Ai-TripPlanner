
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/service/firebaseConfig';
import { toast } from 'sonner';

import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function Viewtrip() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetTripData = async () => {
            try {
        // Wait for Firebase to restore the saved login
        await auth.authStateReady();

        if (!auth.currentUser) {
          toast.error('Please login to view this trip.');
          setLoading(false);
          return;
        }

        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const tripData = docSnap.data();

          if (tripData.userId !== auth.currentUser.uid) {
            toast.error('You are not authorized to view this trip.');
            return;
          }

          setTrip(tripData);
        } else {
          toast.error('No trip found!');
        }
      } catch (error) {
        console.error('Error fetching trip:', error);
        toast.error('Failed to load trip details.');
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  if (loading) {
    return <div className="p-10 text-center">Loading trip details...</div>;
  }

  if (!trip) {
    return <div className="p-10 text-center">Trip not found or access denied.</div>;
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
      <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;
