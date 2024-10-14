import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapPin } from "lucide-react"; // Importe o ícone da Lucide
import "./MapSpotView.css";

// Função para criar um ícone a partir do componente Lucide
const createIcon = () => {
  const svgIcon = document.createElement('div');
  svgIcon.innerHTML = MapPin({ size: 32, color: 'blue' }); // Customize o tamanho e a cor
  return L.divIcon({
    className: 'lucide-icon',
    html: svgIcon.innerHTML,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const MapSpotView = ({ center, spots }) => {
  const customIcon = createIcon(); // Chame a função para criar o ícone

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

export default MapSpotView;