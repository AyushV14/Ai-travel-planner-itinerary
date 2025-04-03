// app/dashboard/_components/Navbar.tsx
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import SearchOverlay from './SearchOverlay';

const Navbar = () => {
  const { user } = useUser();
  const userId = user?.id;
  const updateUserLocation = useMutation(api.users.updateUserLocation);
  const userData = useQuery(api.users.getUser, userId ? { userId } : 'skip');

  const [selectedCity, setSelectedCity] = useState(userData?.location || 'Mumbai');
  const [error, setError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Update selected city when userData changes
  useEffect(() => {
    if (userData?.location) {
      setSelectedCity(userData.location);
    }
  }, [userData]);

  // Handle city change and update database
  const handleCityChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = event.target.value;
    setSelectedCity(newCity);
    if (userId) {
      try {
        await updateUserLocation({ userId, location: newCity });
        setError(null); // Clear any previous errors
      } catch (err) {
        setError('Failed to update location. Please try again.');
        console.error(err);
      }
    }
  };

  // List of famous Indian cities
  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow',
  ];

  return (
    <>
      <nav className="bg-white p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10 border-b border-gray-200">
        {/* Logo and Search Bar Container */}
        <div className="flex items-center space-x-4 ml-10">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-red-600 flex items-center">
              <span>travel</span>
              <span className="text-black">Itinerary</span>
            </div>
          </Link>

          <div className="relative w-[550px]">
          <input
            type="text"
            placeholder="Search for destinations, activities..."
            className="w-full px-10 py-2 rounded-md border border-gray-300 text-gray-600 placeholder-gray-400 focus:outline-none "
            onClick={() => setIsSearchOpen(true)}
          />
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm6-2l4 4" />
            </svg>
          </div>
</div>

        </div>

        {/* Right Side: Location Dropdown and UserButton */}
        <div className="flex items-center space-x-4 mr-10">
          <div className="relative">
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;