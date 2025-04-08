import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { SelectActivityOptions } from '@/constants/options'; // Import the activity options

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3]);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl);
    });
  };

  console.log(photoUrl);

  // Determine the activity icon based on the selected activity
  const activityIcon = SelectActivityOptions.find(
    (option) => option.title === trip?.userSelection?.activity
  )?.icon || '🎉'; // Default to 🎉 if no match

  return (
    <div>
      <img
        src={photoUrl || '/default-travel-placeholder.jpg'}
        onError={(e) => (e.target.src = '/default-travel-placeholder.jpg')}
        alt="Destination Image"
        className='h-[340px] w-full object-cover rounded-xl'
      />

      <div>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5 flex-wrap'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              📅{trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              💰{trip.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              👥No. of traveler/s: {trip.userSelection?.traveler}
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              {activityIcon}{trip.userSelection?.activity || 'No activity selected'}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;