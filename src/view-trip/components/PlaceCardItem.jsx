import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaMapLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log('Place card details:', place);

  useEffect(() => {
    if (place?.name) {
      GetPlacePhoto();
    } else {
      setPhotoUrl('/default-travel-placeholder.jpg');
      setIsLoading(false);
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: place?.name };
      const result = await GetPlaceDetails(data);
      if (result.data.places[0]?.photos?.[3]) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      } else if (place?.imageUrl) {
        setPhotoUrl(place?.imageUrl);
      } else {
        setPhotoUrl('/default-travel-placeholder.jpg');
      }
    } catch (error) {
      console.error('Error fetching place photo:', error);
      setPhotoUrl('/default-travel-placeholder.jpg');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + (place?.name || '')} target='_blank'>
      <div className='shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
        {isLoading ? (
          <div className='skeleton skeleton-img' style={{ width: '130px', height: '130px' }}></div>
        ) : (
          <img
            src={photoUrl || '/default-travel-placeholder.jpg'}
            alt={place?.name || 'Place Image'}
            className='w-[130px] h-[130px] rounded-xl object-cover'
            onError={(e) => {
              e.target.src = '/default-travel-placeholder.jpg';
            }}
          />
        )}
        <div>
          <h2 className='font-bold text-lg'>{place?.name || 'Unnamed Place'}</h2>
          <p className='text-sm text-gray-500'>{place?.details || 'No details available'}</p>
          <h2 className='text-xs font-medium mt-2 mb-2'>🏷️Ticket: {place?.ticketPricing || 'Free'}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;