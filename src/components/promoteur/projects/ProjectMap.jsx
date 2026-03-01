// components/promoteur/ProjectMap.jsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ProjectMap = ({ latitude, longitude, title, address }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    const marker = L.marker([latitude, longitude]).addTo(mapInstanceRef.current);
    
    if (title || address) {
      marker.bindPopup(`
        <div class="text-center">
          ${title ? `<strong class="text-lg">${title}</strong><br/>` : ''}
          ${address ? `<span class="text-sm text-gray-600">${address}</span>` : ''}
        </div>
      `);
    }

    mapInstanceRef.current.setView([latitude, longitude], 13);

    return () => {
      if (marker) {
        marker.remove();
      }
    };
  }, [latitude, longitude, title, address]);

  if (!latitude || !longitude) {
    return (
      <div className="bg-gray-100 rounded-lg p-12 text-center">
        <p className="text-gray-500 text-lg">📍 Coordonnées de localisation non disponibles</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <div ref={mapRef} className="h-96 w-full"></div>
    </div>
  );
};

export default ProjectMap;