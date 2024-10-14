import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import "./Map.css";
import { api } from "../../services/api";

const Map = () => {
  const [spots, setSpots] = useState([]);
  const [center, setCenter] = useState([-27.5953, -48.5482]);

  useEffect(() => {
    const getSpots = async () => {
      try {
        const response = await api("/locais");
        const data = response.data.map(spot => ({
          id: spot.id,
          name: spot.nome,
          description: spot.descricao,
          geoLocality: spot.localidade,
          latitude: spot.coordenadas_geograficas.lat,
          longitude: spot.coordenadas_geograficas.lon
        }));
        setSpots(data);
        if (data.length > 0) {
          setCenter([data[0].latitude, data[0].longitude]);
        }
      } catch (error) {
        console.error('Erro ao buscar locais', error);
      }
    };
    getSpots();
  }, []);

  // Custom icon using MapPin from lucide-react
  const customIcon = L.divIcon({
    html: `<div style="transform: translate(-50%, -100%); color: blue;">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 1 1 18 0z"></path>
               <circle cx="12" cy="10" r="3"></circle>
             </svg>
           </div>`,
    className: ""
  });

  return (
    <div className="map">
      <MapContainer
        center={center}
        zoom={9}
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
              <div className="linkmap">
                <Link to={`/local/${spot.id}`}>Ver Detalhes</Link>
                <a
                  href={`https://www.google.com/maps/?q=${spot.latitude},${spot.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Traçar rota no Maps
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;