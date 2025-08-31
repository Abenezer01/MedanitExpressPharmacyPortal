// src/components/Map.tsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  markers?: { id: number; name: string; position: [number, number] }[];
}
const defaultCord = {
  lat: 9.0062,
  lng: 38.8232,
};
const MapComponent: React.FC<MapComponentProps> = ({
  center = [defaultCord.lat, defaultCord.lng],
  zoom = 13,
  markers,
}) => {
  const [defaultCenter, setDefaultCenter] = useState<[number, number]>([
    center[0] || defaultCord.lat,
    center[1] || defaultCord.lng,
  ]); // London as default

  useEffect(() => {
    // Ensure center is a valid array with two numbers
    if (Array.isArray(center) && center.length === 2) {
      setDefaultCenter([
        center[0] || defaultCord.lat,
        center[1] || defaultCord.lng,
      ]);
    }
  }, [center]);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={zoom}
      style={{ height: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Array.isArray(markers) &&
        markers.length > 0 &&
        markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
