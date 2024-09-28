import { useEffect, useState } from 'react';
import { api } from '../services/api';


export function useSpots() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await api('/spots');
        const data = await response.json();
        setSpots(data);
      } catch (error) {
        console.error('Erro ao buscar locais', error);
      }
    };

    fetchSpots();
  }, []);

  return spots;
}