import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapPin } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import "./Map.css";

const Map = () => {
  const [spots, setSpots] = useState([]);
  const [center, setCenter] = useState([-27.5953, -48.5482]);

  useEffect(() => {
    const getSpots = async () => {
      try {
        const response = await axios.get("https://m3p-backend-squad4-34p5.onrender.com/locais");
        const data = response.data.map(spot => ({
          id: spot.id,
          name: spot.nome,
          description: spot.descrição,
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
          <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
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
            <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}>
              <MapPin color="blue" size={32} /> {/* Ícone de pin em azul */}
            </div>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
