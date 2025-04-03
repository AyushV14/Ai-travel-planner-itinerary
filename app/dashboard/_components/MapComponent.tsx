"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapComponent({ 
  selectedDestination 
}: {
  selectedDestination: { lat: number; lon: number } | null
}) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [mapStatus, setMapStatus] = useState<string>("loading");

  // Initialize map
  useEffect(() => {
    if (typeof window === "undefined" || mapRef.current) return;

    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      setMapStatus("error");
      console.error("Map container not found");
      return;
    }

    // Clear any existing map
    if (mapContainer._leaflet_map) {
      mapContainer._leaflet_map.remove();
    }

    try {
      const map = L.map(mapContainer, {
        preferCanvas: true,
        zoomControl: false
      }).setView([20.5937, 78.9629], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
        detectRetina: true
      }).addTo(map);

      L.control.zoom({ position: 'topright' }).addTo(map);

      mapRef.current = map;
      setMapStatus("ready");

      // Location tracking with timeout
      const locationTimeout = setTimeout(() => {
        if (!mapRef.current) return;
        map.locate({ 
          setView: true, 
          maxZoom: 16,
          timeout: 10000 
        });
      }, 500);

      const onLocationFound = (e: L.LocationEvent) => {
        clearTimeout(locationTimeout);
        const radius = e.accuracy / 2;
        
        // Clear existing layers
        map.eachLayer(layer => {
          if (layer instanceof L.Marker || layer instanceof L.Circle) {
            map.removeLayer(layer);
          }
        });

        L.marker(e.latlng).addTo(map)
          .bindPopup("Your location")
          .openPopup();
        
        L.circle(e.latlng, { radius }).addTo(map);
      };

      map.on("locationfound", onLocationFound);
      map.on("locationerror", (e) => {
        console.error("Location error:", e.message);
        setMapStatus("ready"); // Map is still usable without location
      });

      return () => {
        clearTimeout(locationTimeout);
        map.off("locationfound", onLocationFound);
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    } catch (error) {
      console.error("Map initialization error:", error);
      setMapStatus("error");
    }
  }, []);

  // Update pin when destination changes
  useEffect(() => {
    if (mapStatus !== "ready" || !selectedDestination || !mapRef.current) return;

    const { lat, lon } = selectedDestination;

    try {
      // Remove previous marker
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }

      // Add new marker
      markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
      markerRef.current
        .bindPopup("Selected Destination")
        .openPopup();

      // Smooth transition
      mapRef.current.flyTo([lat, lon], 13, {
        duration: 1,
        easeLinearity: 0.25
      });

    } catch (error) {
      console.error("Marker update error:", error);
    }
  }, [selectedDestination, mapStatus]);

  return (
    <div className="relative h-96 w-full rounded-lg mb-6">
      <div 
        id="map" 
        className="absolute inset-0"
        style={{ 
          backgroundColor: '#e5e7eb',
          zIndex: 1
        }}
      ></div>
      
      {mapStatus === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <p className="animate-pulse">Loading map...</p>
          </div>
        </div>
      )}

      {mapStatus === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <p className="text-red-600">Failed to load map</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}