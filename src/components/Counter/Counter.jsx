import "./Counter.css";

import { useState, useEffect } from "react";

const Counter = () => {
  const [userCount, setUserCount] = useState(0);
  const [spotCount, setSpotCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUserCount(data.length);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    const fetchSpots = async () => {
      // Nova função para buscar spots
      try {
        const response = await fetch("http://localhost:3000/spots");
        const data = await response.json();
        setSpotCount(data.length);
      } catch (error) {
        console.error("Erro ao buscar spots:", error);
      }
    };
    fetchUsers();
    fetchSpots();
  }, []);

  return (
    <div className="counter">
      <div className="cardCounter">
        <h2>Usuários</h2>
        <p>{userCount}</p>
      </div>
      <div className="cardCounter">
        <h2>Locais</h2>
        <p>{spotCount}</p>
      </div>
    </div>
  );
};

export default Counter;
