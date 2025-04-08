import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    try {
      const result = await GetPlaceDetails(data);
      const photo = result.data.places[0]?.photos?.[3];
      if (photo) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photo.name);
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl('/default-travel-placeholder.jpg'); // Fallback if no photo
      }
    } catch (error) {
      console.error('Error fetching place photo:', error);
      setPhotoUrl('/default-travel-placeholder.jpg');
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className='hover:scale-105 transition-all'>
        <img
          src={photoUrl || '/default-travel-placeholder.jpg'} // Updated fallback
          alt={trip?.userSelection?.location?.label || 'Trip Image'}
          className='object-cover rounded-xl h-[200px] w-[400px]' // Fixed height and width
          onError={(e) => (e.target.src = '/default-travel-placeholder.jpg')} // Fallback on error
        />
        <div className='p-3'>
          <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label || 'Unknown Location'}</h2>
          <h2 className='text-sm text-gray-500'>
            {trip?.userSelection?.noOfDays || 1} Days trip with {trip?.userSelection?.budget || 'Unknown'} budget.
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;