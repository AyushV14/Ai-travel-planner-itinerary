// app/dashboard/_components/Sidebar.tsx
import React, { useState } from 'react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  // Sample static JSON data for itineraries
  const itineraries = [
    { id: 1, title: "Paris Trip 2025", date: "2025-06-15" },
    { id: 2, title: "New York Weekend", date: "2025-07-20" },
    { id: 3, title: "Tokyo Adventure", date: "2025-08-10" },
  ]

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-20`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Previous Itineraries</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {itineraries.map((itinerary) => (
              <div 
                key={itinerary.id} 
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <h3 className="font-medium text-gray-800">{itinerary.title}</h3>
                <p className="text-sm text-gray-600">{itinerary.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-10"
        />
      )}
    </>
  )
}

export default Sidebar