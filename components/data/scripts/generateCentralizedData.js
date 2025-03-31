const axios = require('axios');
const citiesData = require('../InitialCities.json'); // Fixed the path
const fs = require('fs');

const BASE_TRAIN_API = 'http://localhost:3000/trains';

// Function to fetch locationId for a city
async function getLocationId(cityName) {
  const options = {
    method: 'GET',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation',
    params: { query: cityName },
    headers: {
      'x-rapidapi-key': 'dd6e2df43cmsh13b7ce2c2169946p1e7d93jsnaccca977b496',
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data[0]?.locationId || null;
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
      'x-rapidapi-key': 'dd6e2df43cmsh13b7ce2c2169946p1e7d93jsnaccca977b496',
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

// Function to fetch train data between two cities
async function getTrainsBetweenStations(from, to) {
  try {
    const response = await axios.get(`${BASE_TRAIN_API}/betweenStations`, {
      params: { from, to }
    });
    return response.data.data || [];
  } catch (error) {
    console.error(`Error fetching trains from ${from} to ${to}:`, error);
    return [];
  }
}

// Main function to generate the centralized dataset
async function generateCentralizedData() {
  const centralizedData = {
    destinations: []
  };

  for (const city of citiesData.destinations) {
    const { name, stationCode } = city;
    const locationId = await getLocationId(name);
    if (!locationId) {
      console.warn(`No locationId found for ${name}, skipping...`);
      continue;
    }
    const restaurants = await getRestaurants(locationId);

    // Get trains from this city to all other cities
    const trainData = [];
    for (const destination of citiesData.destinations) {
      if (destination.name !== name) {
        const trains = await getTrainsBetweenStations(stationCode, destination.stationCode);
        trainData.push({ destination: destination.name, trains });
      }
    }

    centralizedData.destinations.push({
      ...city,
      locationId,
      restaurants,
      trains: trainData
    });
  }

  fs.writeFileSync('../centralizedData.json', JSON.stringify(centralizedData, null, 2));
  console.log('Centralized data generated successfully at components/data/centralizedData.json');
}

generateCentralizedData();
