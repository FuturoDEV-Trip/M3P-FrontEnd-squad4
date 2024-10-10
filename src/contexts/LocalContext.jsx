import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const LocalContext = createContext({
  localSpots: [],
  fetchLocalSpots: async () => {},
  deleteLocalSpot: async (id) => {},
});

export function LocalProvider({ children }) {
  const [localSpots, setLocalSpots] = useState([]);

  const fetchLocalSpots = async (userId) => {
    try {
      const response = await axios.get(`/locais/meus-locais`);
      const mappedSpots = response.data.map((spot) => ({
        id: spot.id,
        name: spot.nome,
        description: spot.descricao,
        address: spot.localidade,
        geoLocality: spot.coordenadas_geograficas,
        latitude: spot.coordenadas_geograficas.lat,
        longitude: spot.coordenadas_geograficas.lon,
        user_id: spot.usuario_id,
      }));
      setLocalSpots(mappedSpots);
    } catch (error) {
      console.error("Houve um erro ao buscar os locais:", error);
    }
  };

  const deleteLocalSpot = async (id) => {
    try {
      await axios.delete(`/locais/${id}`);
      setLocalSpots((prevSpots) => prevSpots.filter((spot) => spot.id !== id));
      alert("Local apagado com sucesso!");
    } catch (error) {
      console.error("Houve um erro ao apagar o local:", error);
    }
  };

  return (
    <LocalContext.Provider value={{ localSpots, fetchLocalSpots, deleteLocalSpot }}>
      {children}
    </LocalContext.Provider>
  );
}

LocalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

