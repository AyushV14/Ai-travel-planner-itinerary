import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  console.log('Itinerary Data:', trip.tripData?.itinerary); // Debug log

  return (
    <div>
      <h2 className='font-bold text-xl'>Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary && Array.isArray(trip.tripData.itinerary) ? (
          trip.tripData.itinerary.map((dayData, index) => (
            <div className='mt-5' key={index}>
              <h2 className='font-bold text-lg'>{dayData.day || `Day ${index + 1}`}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
                {dayData.plan && Array.isArray(dayData.plan) ? (
                  dayData.plan.map((place, idx) => (
                    <div className='my-2' key={idx}>
                      <h2 className='font-medium text-sm text-orange-600'>{place.time || 'No time'}</h2>
                      <PlaceCardItem place={place} />
                    </div>
                  ))
                ) : (
                  <p>No plan available for this day.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary data available.</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;