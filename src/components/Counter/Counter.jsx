import "./Counter.css";

import { useState, useEffect } from "react";

const Counter = () => {
  const [userCount, setUserCount] = useState(0);
  const [spotCount, setSpotCount] = useState(0);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://localhost:3000/dashboard");
        const data = await response.json();
        setUserCount(data.usuarios);
        setSpotCount(data.locais);
      } catch (error) {
        console.error("Erro ao buscar usuários e locais:", error);
      }
    };
    fetchDashboard();
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
