import "./Counter.css";
import { api } from "../../services/api"

import { useState, useEffect } from "react";

const Counter = () => {
  const [userCount, setUserCount] = useState(0);
  const [spotCount, setSpotCount] = useState(0);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardResponse = await api("/dashboard", { method: "GET" });
        setSpotCount(dashboardResponse.data.locais);

        const usersResponse = await api("/usuarios/logado", { method: "GET" });
        setUserCount(usersResponse.data.length);

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
