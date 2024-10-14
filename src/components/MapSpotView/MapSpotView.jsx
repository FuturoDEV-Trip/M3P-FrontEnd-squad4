import "leaflet/dist/leaflet.css";
import { MapPin } from 'lucide-react';
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./MapSpotView.css";

const MapSpotView = ({ center, spots }) => {
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
          <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
            <Popup>
              <strong>{spot.name}</strong>
              <br />
              {spot.description}
              <div className="linkmapspotview">
                {/* <Link to={`/local/${spot.id}`}>Ver Detalhes</Link> */}
                <a
                href={`https://www.google.com/maps/?q=${spot.latitude},${spot.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no Maps
                </a>
              </div>
            </Popup>
            <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}>
              <MapPin color="blue" size={32} /> {/* ** Ícone de pin em azul ** */}
            </div>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapSpotView;
