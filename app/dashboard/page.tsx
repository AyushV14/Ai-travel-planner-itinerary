"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Navbar from "./_components/Navbar";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import centralizedData from "../../components/data/centralizedData.json";

// Dynamically import the MapComponent to avoid SSR issues
const MapComponent = dynamic(() => import("./_components/MapComponent"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>,
});

// Then in your JSX:


export default function DashboardPage() {
  const { user } = useUser();
  const userId = user?.id;
  const email = user?.emailAddresses[0].emailAddress;
  const name = user?.fullName;

  const userData = useQuery(api.users.getUser, userId ? { userId } : "skip");
  const [selectedDestination, setSelectedDestination] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  

  // Mock data for previous itineraries
  const itineraries = [
    { id: 1, title: "Paris Trip 2025", date: "2025-06-15" },
    { id: 2, title: "New York Weekend", date: "2025-07-20" },
    { id: 3, title: "Tokyo Adventure", date: "2025-08-10" },
  ];
  

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="bg-gray-100 min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section Skeleton */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Previous Itineraries Section Skeleton */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-64 h-40 bg-gray-50 rounded-lg shadow-md flex-shrink-0 flex flex-col justify-between p-4"
              >
                <div>
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Map and Destinations Section Skeleton */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-96 w-full bg-gray-200 rounded-lg animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const handleDestinationClick = (lat: number, lon: number) => {
    console.log("Destination clicked - lat:", lat, "lon:", lon);
    setSelectedDestination({ lat, lon });
  };
  

  if (!userId || userData === undefined) {
    return <SkeletonLoader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-20 pb-8 px-4">
      <Navbar />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-normal text-gray-800 mb-2">
            Welcome, <span className="text-red-600 font-semibold">{name}</span>! Ready to Create Your Personal Itinerary?
          </h1>
          <p className="text-lg text-gray-600 italic">Plan your next adventure with ease.</p>
        </div>

        {/* Previous Itineraries Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Your Previous Itineraries
            </h2>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors">
              Create New Itinerary
            </button>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {itineraries.length > 0 ? (
              itineraries.map((itinerary) => (
                <div
                  key={itinerary.id}
                  className="w-64 h-40 bg-gray-50 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex-shrink-0 flex flex-col justify-between p-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {itinerary.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{itinerary.date}</p>
                  </div>
                  <button className="border border-red-600 text-red-600 px-3 py-1 rounded hover:bg-red-50 transition-colors">
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600">
                <p>No itineraries yet. Create your first one now!</p>
                <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Create Itinerary
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Map and Destinations Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m6 6H9"
              />
            </svg>
            Explore Destinations on the Map
          </h2>
          
          <MapComponent selectedDestination={selectedDestination} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {centralizedData.destinations.map((destination) => (
                <div key={destination.id} className="relative w-full h-48 rounded-lg overflow-hidden shadow-md group">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-50 cursor-pointer"
                    onClick={() => handleDestinationClick(
                      destination.coordinates.lat,
                      destination.coordinates.lon
                    )}
                  />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl font-semibold drop-shadow-md flex flex-col items-center justify-center">
                    {destination.name}
                    <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`Navigate to ${destination.name} details page`);
                    }}
                    className="text-white text-sm underline hover:text-gray-300 transition-colors"
                  >
                    View Details
                  </a>
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}