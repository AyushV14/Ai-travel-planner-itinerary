import React from 'react';
import ActivityCardItem from './ActivityCardItem';

function Activities({ trip }) {
  const activities = trip?.tripData?.activities || [];
  console.log('Activities Data:', activities); // Debug log

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Recommended Activities</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {activities.length > 0 ? (
          activities.map((activity, index) => <ActivityCardItem key={index} activity={activity} />)
        ) : (
          <p>No activities available for this trip.</p>
        )}
      </div>
    </div>
  );
}

export default Activities;