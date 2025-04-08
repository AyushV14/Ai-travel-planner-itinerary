import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ActivityCardItem({ activity }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log('Activity card details:', activity);

  useEffect(() => {
    if (activity?.name) {
      GetPlacePhoto();
    } else {
      setPhotoUrl('/default-travel-placeholder.jpg');
      setIsLoading(false);
    }
  }, [activity]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: activity?.name };
      const result = await GetPlaceDetails(data);
      if (result.data.places[0]?.photos?.[3]) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      } else if (activity?.imageUrl) {
        setPhotoUrl(activity?.imageUrl);
      } else {
        setPhotoUrl('/default-travel-placeholder.jpg');
      }
    } catch (error) {
      console.error('Error fetching activity photo:', error);
      setPhotoUrl('/default-travel-placeholder.jpg');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' +
        (activity?.name || '') +
        ',' +
        (activity?.geoCoordinates || '')
      }
      target='_blank'
    >
      <div className='hover:scale-110 transition-all cursor-pointer mt-5 mb-8'>
        {isLoading ? (
          <div className='skeleton skeleton-img'></div>
        ) : (
          <img
            src={photoUrl || '/default-travel-placeholder.jpg'}
            className='rounded-xl h-[180px] w-full object-cover'
            alt={activity?.name || 'Activity Image'}
            onError={(e) => {
              e.target.src = '/default-travel-placeholder.jpg';
            }}
          />
        )}
        <div className='my-2'>
          <h2 className='font-medium'>{activity?.name || 'Unnamed Activity'}</h2>
          <h2 className='text-xs text-gray-500'>📍{activity?.geoCoordinates || 'No coordinates available'}</h2>
          <h2 className='text-sm'>💰{activity?.ticketPricing || 'Price not available'}</h2>
          <h2 className='text-sm'>⭐{activity?.rating || 'No rating'}</h2>
        </div>
      </div>
    </Link>
  );
}

export default ActivityCardItem;