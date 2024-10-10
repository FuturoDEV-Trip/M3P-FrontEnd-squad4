import React, { createContext, useContext, useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';

const SpotsContext = createContext();

export const SpotsProvider = ({ children }) => {
  const [localSpots, setLocalSpots] = useState([]);
  const { axiosInstance, checkAuth } = useAxios();

  useEffect(() => {
    const getSpots = async () => {
      if (!checkAuth()) return;

      try {
        const response = await axiosInstance.get('/locais/meus-locais');
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
        alert("Houve um erro ao buscar os locais");
      }
    };

    getSpots();
  }, [axiosInstance, checkAuth]);

  const deleteSpot = async (id) => {
    const confirmation = window.confirm("Tem certeza de que deseja excluir este local?");
    if (!confirmation) return;

    try {
      await axiosInstance.delete(`/locais/${id}`);
      setLocalSpots(prevSpots => prevSpots.filter((spot) => spot.id !== id));
      alert("Local apagado com sucesso!");
    } catch (error) {
      console.error("Houve um erro ao apagar o local:", error);
      alert("Houve um erro ao apagar o local");
    }
  };

  const addSpot = async (data) => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    const dataSpots = {
      usuario_id: userId,
      nome: data.name,
      descricao: data.description,
      localidade: data.address,
      cep: data.cep,
      coordenadas_geograficas: JSON.stringify({
        lat: data.latitude,
        lon: data.longitude,
      }),
    };

    try {
      await axiosInstance.post("/locais", dataSpots);
      alert("Local cadastrado com sucesso!");
      // Refresh the spots list
      getSpots();
    } catch (error) {
      console.error("Houve um erro ao cadastrar o local:", error);
      alert("Houve um erro ao cadastrar o local");
    }
  };

  const editSpot = async (id, data) => {
    try {
      const dataSpots = {
        usuario_id: data.user_id,
        nome: data.name,
        descricao: data.description,
        localidade: data.address,
        cep: data.cep,
        coordenadas_geograficas: JSON.stringify({
          lat: data.latitude,
          lon: data.longitude,
        }),
      };

      await axiosInstance.put(`/locais/${id}`, dataSpots);
      alert("Local atualizado com sucesso!");
      // Refresh the spots list
      getSpots();
    } catch (error) {
      console.error("Houve um erro ao atualizar o local:", error);
      alert("Houve um erro ao atualizar o local.");
    }
  };

  return (
    <SpotsContext.Provider value={{ localSpots, deleteSpot, addSpot, editSpot }}>
      {children}
    </SpotsContext.Provider>
  );
};

export const useSpots = () => {
  return useContext(SpotsContext);
};