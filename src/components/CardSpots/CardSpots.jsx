import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardSpots.css";
import { Link } from "react-router-dom";

function CardSpots() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    // axios.get("http://localhost:3000/locais")
    axios.get('https://m3p-backend-squad4-34p5.onrender.com/locais')
      .then(response => {
        setSpots(response.data);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar os locais!", error);
      });
  }, []);

  return (
    <div className="Grid-Category">
      <div className="card-categorias">
        {spots.map((spot) => (
          <div className="card-category" key={spot.id}>
            <Link to={`/local/${spot.id}`}>
              <div className="card-categoria-txt">
                <span>{spot.nome}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardSpots;