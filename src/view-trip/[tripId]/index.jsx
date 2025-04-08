import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Activities from '../components/Activities';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({});

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document: ', docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log('No such document');
      toast('No trip found');
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <Activities trip={trip} />
      <PlacesToVisit trip={trip} />
      <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;