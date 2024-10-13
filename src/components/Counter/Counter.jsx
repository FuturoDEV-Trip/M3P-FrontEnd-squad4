import "./Counter.css";

import { useState, useEffect } from "react";

const Counter = () => {
  const [userCount, setUserCount] = useState(0);
  const [spotCount, setSpotCount] = useState(0);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardResponse = await fetch("https://m3p-backend-squad4-34p5.onrender.com/dashboard");
        const dashboardData = await dashboardResponse.json();
        setSpotCount(dashboardData.locais);
        
        const usersResponse = await fetch("https://m3p-backend-squad4-34p5.onrender.com/logado");
        const usersData = await usersResponse.json();
        setUserCount(usersData.length);

      } catch (error) {
        console.error("Erro ao buscar usuários e locais:", error);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="counter">
      <div className="cardCounter">
        <h2>Usuários Ativos</h2>
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
