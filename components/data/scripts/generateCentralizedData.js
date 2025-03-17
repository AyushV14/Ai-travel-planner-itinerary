// C:\Users\Ayush\Desktop\next.js\travel-itinerary-generator\components\data\scripts\generateCentralizedData.js
const axios = require('axios');
const citiesData = require('../InitialCities.json'); // Fixed the path
const fs = require('fs');

// Function to fetch locationId for a city
async function getLocationId(cityName) {
  const options = {
    method: 'GET',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation',
    params: { query: cityName },
    headers: {
      'x-rapidapi-key': 'ead5355cbcmsh1cbfe5ce3f211eap11e04fjsne433f9598501',
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const locationId = response.data.data[0]?.locationId;
    return locationId || null;
  } catch (error) {
    console.error(`Error fetching locationId for ${cityName}:`, error);
    return null;
  }
}

// Function to fetch restaurant data for a locationId
async function getRestaurants(locationId) {
  const options = {
    method: 'GET',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants',
    params: { locationId: locationId },
    headers: {
      'x-rapidapi-key': 'ead5355cbcmsh1cbfe5ce3f211eap11e04fjsne433f9598501',
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data || [];
  } catch (error) {
    console.error(`Error fetching restaurants for locationId ${locationId}:`, error);
    return [];
  }
}

// Main function to generate the centralized dataset
async function generateCentralizedData() {
  const centralizedData = {
    destinations: []
  };

  for (const city of citiesData.destinations) {
    const { name } = city;
    const locationId = await getLocationId(name);
    if (!locationId) {
      console.warn(`No locationId found for ${name}, skipping...`);
      continue;
    }
    const restaurants = await getRestaurants(locationId);
    centralizedData.destinations.push({
      ...city,
      locationId,
      restaurants
    });
  }

  fs.writeFileSync('../centralizedData.json', JSON.stringify(centralizedData, null, 2));
  console.log('Centralized data generated successfully at components/data/centralizedData.json');
}

generateCentralizedData();