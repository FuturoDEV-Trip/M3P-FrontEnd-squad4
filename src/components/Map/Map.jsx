import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSpots } from "../../hooks/useSpots";

import "leaflet/dist/leaflet.css";
import "./Map.css";
import { Link } from "react-router-dom";

const Map = () => {
  const spots = useSpots();
  const [center, setCenter] = useState([-27.5953, -48.5482]);

  useEffect(() => {
    if (spots.length > 0) {
      setCenter([spots[0].latitude, spots[0].longitude]);
    }
  }, [spots]);

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
