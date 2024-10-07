import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSpots } from "../../hooks/useSpots";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { Link } from "react-router-dom";

const Map = () => {
  const [spots, setSpots] = useState([]);
  const [center, setCenter] = useState([-27.5953, -48.5482]);

  // useEffect(() => {
  //   if (spots.length > 0) {
  //     setCenter([spots[0].latitude, spots[0].longitude]);
  //   }
  // }, [spots]);
  useEffect(() => {
    const getSpots = async () => {
      try {
        const response = await axios.get("http://localhost:3000/locais");
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
                  href={spot.geoLocality}
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
