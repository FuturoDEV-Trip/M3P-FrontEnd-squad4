import React from 'react';
import { useParams } from 'react-router-dom';
import { useSpots } from '../../hooks/useSpots';
import './SpotView.css';
import MapSpotView from '../MapSpotView/MapSpotView';

function SpotView() {
  const { id } = useParams();
  const spots = useSpots();
  const spot = spots.find(spot => spot.id === id);

  return spot ? (
    <div className="divspotview">
      <h1 className="h1spotview">{spot.name}</h1>
      <div className="divspotview2">
        <p><strong>Descrição:</strong> {spot.description}</p>
        <p><strong>Categoria de Atração:</strong> {spot.attractionCategory}</p>
        <p><strong>Nível de Aventura:</strong> {spot.adventureLevel}</p>
        <p><strong>Custo:</strong> {spot.cost}</p>
        <p><strong>Avaliação:</strong> {spot.rate}</p>
        <p><strong>Acessibilidade:</strong> {spot.accessibility ? 'Sim' : 'Não'}</p>
        <p><strong>Coleta Seletiva de Lixo:</strong> {spot.selectiveWasteCollection ? 'Sim' : 'Não'}</p>
        <p><strong>Endereço:</strong> {spot.address}</p>
        <p><strong>CEP:</strong> {spot.cep}</p>
        <p><strong>Ponto de Referência:</strong> {spot.referencePoint}</p>
        <p><strong>Latitude:</strong> {spot.latitude}</p>
        <p><strong>Longitude:</strong> {spot.longitude}</p>
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