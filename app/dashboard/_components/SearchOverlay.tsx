import React, { useState } from 'react';

// Import the centralized data (adjust the path based on your project structure)
import centralizedData from '@/components/data/centralizedData.json';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Static filter categories for the left side
  const filterCategories = [
    'Beaches',
    'Culture',
    'Heritage',
    'Nightlife',
    'Adventure',
    'Wildlife',
    'Hill Stations',
    'Temples',
    'Food Tours',
    'Shopping',
    'Historical Sites',
    'Museums',
    'Festivals',
    'Nature',
    'Waterfalls',
    'Trekking',
    'Spiritual',
    'Architecture',
    'Local Markets',
    'Scenic Views',
  ];

  // Static activities for the left side
  const activities = [
    'Snorkeling',
    'Scuba Diving',
    'Paragliding',
    'Hiking',
    'Camping',
    'Safari Tours',
    'Kayaking',
    'Rafting',
    'Bungee Jumping',
    'Rock Climbing',
    'Cycling',
    'Bird Watching',
    'Photography',
    'Yoga Retreats',
    'Cooking Classes',
    'Wine Tasting',
    'Boat Tours',
    'Hot Air Ballooning',
    'Skiing',
    'Surfing',
  ];

  // Extract destinations from centralizedData.json
  const destinations = centralizedData.destinations;

  // State for selected filters and search
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle category selection (allow multiple)
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle activity selection (allow multiple)
  const handleActivityToggle = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    setShowResults(true);
  };

  // Mock search results based on selected filters
  const searchResults = destinations.filter((destination) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      destination.types?.some((type: string) => selectedCategories.includes(type));
    const matchesActivity =
      selectedActivities.length === 0 ||
      destination.activities?.some((activity: string) => selectedActivities.includes(activity));
    const matchesQuery =
      searchQuery === '' ||
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesActivity && matchesQuery;
  });

  return (
    <div
      className={`fixed inset-0 bg-black z-20 flex items-center justify-center transition-all duration-500 ease-in-out ${
        isOpen ? 'bg-opacity-60' : 'bg-opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white w-full h-full p-10 overflow-y-auto transform transition-all duration-500 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}
      >
        {/* Header with Search Bar and Search Button */}
        <div className="flex items-center justify-between mb-12 max-w-7xl mx-auto">
          <div className="flex items-center w-full max-w-xl space-x-4">
            <input
              type="text"
              placeholder="Search for destinations, activities..."
              className="w-full px-5 py-3 rounded-lg border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors"
            >
              Search
            </button>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Content: Left (Filters or Results) and Right (City Photos) */}
        <div className="flex gap-16 max-w-7xl mx-auto">
          {/* Left Side: Filters or Search Results */}
          <div className="w-1/2">
            {showResults ? (
              // Search Results
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-8">Search Results</h3>
                {searchResults.length > 0 ? (
                  <div className="space-y-6">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center bg-gray-50 rounded-lg shadow-md p-4"
                      >
                        {/* Left: Photo */}
                        <img
                          src={result.image}
                          alt={result.name}
                          className="w-32 h-32 object-cover rounded-lg mr-4"
                        />
                        {/* Right: Name and Description */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">{result.name}</h4>
                          <p className="text-sm text-gray-600">{result.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No results found for your search.</p>
                )}
              </div>
            ) : (
              // Filters: Categories and Activities
              <>
                {/* Explore by Category */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-8">Explore by Category</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {filterCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`text-sm font-medium px-5 py-2.5 rounded-full border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm ${
                          selectedCategories.includes(category)
                            ? 'bg-red-50 text-red-600 border-red-200'
                            : 'text-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explore by Activities */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-8">Explore by Activities</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {activities.map((activity) => (
                      <button
                        key={activity}
                        onClick={() => handleActivityToggle(activity)}
                        className={`text-sm font-medium px-5 py-2.5 rounded-full border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm ${
                          selectedActivities.includes(activity)
                            ? 'bg-blue-50 text-blue-600 border-blue-200'
                            : 'text-gray-600'
                        }`}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Side: City Photos (Always Visible) */}
          <div className="w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">Popular Destinations</h3>
            <div className="grid grid-cols-2 gap-6">
              {destinations.map((destination) => (
                <div key={destination.id} className="relative group rounded-lg overflow-hidden shadow-md">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-56 object-cover transition-all duration-300 group-hover:brightness-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xl font-semibold drop-shadow-md">{destination.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;