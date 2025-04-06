import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl'>Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary).map(([dayKey, dayData], index) => (
            <div className='mt-5' key={index}>
              <h2 className='font-bold text-lg'>{dayKey}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
                {dayData.plan.map((place, idx) => (
                  <div className='my-2' key={idx}>
                    <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
