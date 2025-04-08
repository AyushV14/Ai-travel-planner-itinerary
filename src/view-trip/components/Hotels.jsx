import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotels || [];
  console.log('Hotels Data:', hotels); // Debug log

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => <HotelCardItem key={index} hotel={hotel} />)
        ) : (
          <p>No hotels available for this trip.</p>
        )}
      </div>
    </div>
  );
}

export default Hotels;