import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log('Hotel card details:', hotel);

  useEffect(() => {
    if (hotel?.name) {
      GetPlacePhoto();
    } else {
      setPhotoUrl('/default-travel-placeholder.jpg');
      setIsLoading(false);
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: hotel?.name };
      const result = await GetPlaceDetails(data);
      if (result.data.places[0]?.photos?.[3]) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      } else if (hotel?.imageUrl) {
        setPhotoUrl(hotel?.imageUrl);
      } else {
        setPhotoUrl('/default-travel-placeholder.jpg');
      }
    } catch (error) {
      console.error('Error fetching hotel photo:', error);
      setPhotoUrl('/default-travel-placeholder.jpg');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' +
        (hotel?.name || '') +
        ',' +
        (hotel?.address || '')
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
            alt={hotel?.name || 'Hotel Image'}
            onError={(e) => {
              e.target.src = '/default-travel-placeholder.jpg';
            }}
          />
        )}
        <div className='my-2'>
          <h2 className='font-medium'>{hotel?.name || 'Unnamed Hotel'}</h2>
          <h2 className='text-xs text-gray-500'>📍{hotel?.address || 'No address available'}</h2>
          <h2 className='text-sm'>💰{hotel?.price || 'Price not available'}</h2>
          <h2 className='text-sm'>⭐{hotel?.rating || 'No rating'}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;