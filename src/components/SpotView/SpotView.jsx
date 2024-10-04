import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import './SpotView.css';
import MapSpotView from '../MapSpotView/MapSpotView';
import axios from 'axios';

function useSpots() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSpots = async () => {
      try {
        const response = await axios.get('http://localhost:3000/locais');
        const data = response.data.map(spot => ({
          id: spot.id,
          name: spot.nome_do_destino,
          description: spot.descricao,
          address: spot.localidade,
          geoLocality: spot.coordenadas_geograficas,
          latitude: JSON.parse(spot.coordenadas_geograficas).lat,
          longitude: JSON.parse(spot.coordenadas_geograficas).lon,
          userId: spot.usuario_id, 
          cep: spot.cep,
          createdAt: spot.createdAt, 
          updatedAt: spot.updatedAt
        }));
        setSpots(data);
      } catch (error) {
        console.error('Erro ao buscar locais', error);
      } finally {
        setLoading(false);
      }
    };

    getSpots();
  }, []);

  return { spots, loading };
}

function SpotView() {
  const { id } = useParams();
  const { spots, loading } = useSpots();
  const spot = spots.find(spot => spot.id === Number(id));

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      if (spot) {
        try {
          const response = await axios.get(`http://localhost:3000/usuarios/${spot.userId}`);
          const fullName = response.data.nome;
          const firstName = fullName.split(' ')[0]; // Pega o primeiro nome
          setUserName(firstName);
          // setUserName(response.data.nome); // Supondo que o nome do usuário está na propriedade "nome"
        } catch (error) {
          console.error('Erro ao buscar usuário', error);
        }
      }
    };

    fetchUserName();
  }, [spot]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return spot ? (
    <div className="divspotview">
      <h1 className="h1spotview">{spot.name}</h1>
      <div className="divspotview2">
        <p><strong>Descrição:</strong> {spot.description}</p> 
        <p><strong>Endereço:</strong> {spot.address}</p>
        <p><strong>CEP:</strong> {spot.cep}</p>
        <p><strong>Latitude:</strong> {spot.latitude}</p>
        <p><strong>Longitude:</strong> {spot.longitude}</p>
        <p><strong>Criado em</strong> {new Date(spot.createdAt).toLocaleDateString()} <strong>por </strong>{userName}  </p>
        <p><strong>Última Alteração:</strong> {new Date(spot.updatedAt).toLocaleDateString()}</p>
      </div>
      <div className="mapspotview">
        <MapSpotView center={[spot.latitude, spot.longitude]} spots={[spot]} />
      </div>
    </div>
  ) : ( 
    <div>Não encontrado...</div>
  );
}

export default SpotView;