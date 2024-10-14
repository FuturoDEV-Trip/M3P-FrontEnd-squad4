import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./MapSpotView.css";

const MapSpotView = ({ center, spots }) => {
  // Custom icon using an image from public/logotrip.png
  const customIcon = L.icon({
    iconUrl: '/logotrip.png',
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
  });

  return (
    <div className="mapspotview">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {spots.map((spot) => (
          <Marker key={spot.id} position={[spot.latitude, spot.longitude]} icon={customIcon}>
            <Popup>
              <strong>{spot.name}</strong>
              <br />
              {spot.description}
              <div className="linkmapspotview">
                <a
                  href={`https://www.google.com/maps/?q=${spot.latitude},${spot.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no Maps
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapSpotView