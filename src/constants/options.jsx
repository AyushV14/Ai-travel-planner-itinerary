export const SelectTravelList = [
    {
        id:1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people:'1 person'
    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people:'2 people'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸',
    }
]

export const SelectActivityOptions = [
    {
      id: 1,
      title: 'Adventure',
      desc: 'Thrilling outdoor experiences like hiking or zip-lining',
      icon: '🏞️',
    },
    {
      id: 2,
      title: 'Culture',
      desc: 'Museums, historical sites, and local traditions',
      icon: '🏛️',
    },
    {
      id: 3,
      title: 'Relaxation',
      desc: 'Beaches, spas, and leisurely activities',
      icon: '🏖️',
    },
    {
      id: 4,
      title: 'Food',
      desc: 'Culinary tours, local dining, and food markets',
      icon: '🍽️',
    },
  ];
  
  export const AI_PROMPT = `
  You are a travel planning assistant. Based on the user's preferences, generate a detailed travel plan in JSON format. The user has selected:
  - Location: {location}
  - Number of days: {totalDays}
  - Traveler type: {traveler}
  - Budget: {budget}
  - Preferred activities: {activity}
  
  Return the response as a JSON object with the following structure:
  {
    "hotels": [
      {
        "name": "string (hotel name)",
        "address": "string (full address)",
        "description": "string (hotel description)",
        "geoCoordinates": "string (latitude, longitude e.g., '31.1048,77.1734')",
        "imageUrl": "string (URL of hotel image)",
        "price": "string (e.g., 'From ₹1000 per night' or 'from $300/night')",
        "rating": "string (e.g., '4.8 stars')"
      }
    ],
    "activities": [
      {
        "name": "string (activity name)",
        "geoCoordinates": "string (latitude, longitude e.g., '15.5000, 73.7700')",
        "ticketPricing": "string (e.g., '$50-$75 per person')",
        "rating": "string (e.g., '4.0 stars')",
        "imageUrl": "string (URL of activity image)"
      }
    ],
    "itinerary": [
      {
        "day": "string (e.g., 'Day 1')",
        "plan": [
          {
            "time": "string (e.g., 'Morning (9:00 AM - 12:00 PM)')",
            "name": "string (hotel name from the 'hotels' list, matched to the user's budget)",
            "details": "string (hotel description or additional relaxation activity details if applicable)",
            "geoCoordinates": "string (latitude, longitude from the hotel)",
            "ticketPricing": "string (hotel price or activity price if applicable, e.g., 'from $300/night' or '$50-$75 per person')",
            "imageUrl": "string (URL of hotel image or activity image)",
            "rating": "string (e.g., '4.0 stars' from the hotel or activity)"
          }
        ]
      }
    ]
  }
  
  Ensure all fields are included for each object. For the 'itinerary.plan', prioritize listing the hotel names from the 'hotels' array that match the user's budget (e.g., 'luxury' budget should include high-end hotels). Include the hotel's address, price, and rating. Optionally, add relaxation activities (e.g., spa treatments) with their own details and pricing if they align with the 'Relaxation' preference, but the primary focus should be the hotels. Use placeholder values (e.g., 'N/A') if data is unavailable. Do not deviate from this structure or field names.
  `;