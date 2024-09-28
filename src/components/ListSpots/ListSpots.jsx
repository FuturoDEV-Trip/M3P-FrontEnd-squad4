import "./ListSpots.css";
import { useState } from "react";
import { useSpots } from "../../hooks/useSpots";
import { Link } from "react-router-dom";
import { Trash, Edit, Eye } from "lucide-react";
import { api } from "../../services/api";

function ListSpots() {
  const spots = useSpots();
  const [localSpots, setLocalSpots] = useState(spots);
  const user = JSON.parse(localStorage.getItem("@tripflow:user"));
  const userId = user?.id;
  const userSpots = spots.filter((spot) => spot.user_id === userId);

  async function deleteSpot(id) {
    const spot = spots.find((spot) => spot.id === id);
    if (spot.user_id !== userId) {
      alert("Você não tem permissão para excluir este local");
      return;
    }

    const confirmation = window.confirm(
      "Tem certeza de que deseja excluir este local?"
    );
    if (!confirmation) {
      return;
    }

    try {
      const response = await api(`/spots/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Erro na resposta da API:", await response.text());
        alert("Erro ao apagar local");
        return;
      }

      alert("Local apagado com sucesso!");
      setLocalSpots(localSpots.filter((spot) => spot.id !== id));
    } catch (error) {
      console.error("Houve um erro ao apagar o local:", error);
      alert("Houve um erro ao apagar o local");
    }
  }
  return (
    <div className="listspots">
      <h1> MEUS LOCAIS</h1>
      <table className="list-categorias">
        <thead>
          <tr>
            <th>Local</th>
            <th>Endereço</th>
            <th>Data de Visita</th>
            <th>Avaliação</th>
            <th>Ver no Mapa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {userSpots.map((spot) => (
            <tr key={spot.id} className="list-category">
              <td>{spot.name}</td>
              <td>{spot.address}</td>
              <td>{new Date(spot.visitDate).toLocaleDateString()}</td>
              <td>{spot.rate}</td>
              <td>
                <a
                  href={`https://www.google.com/maps/?q=${spot.geolocality}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no Mapa
                </a>
              </td>
              <td>
                <Link to={`/local/${spot.id}`} style={{ marginRight: "10px" }}>
                  <Eye size={20} color="green" />
                </Link>
                <Link
                  to={`/local/edit/${spot.id}`}
                  style={{ marginRight: "10px" }}
                >
                  <Edit size={20} color="#000" />
                </Link>
                <button
                  onClick={() => deleteSpot(spot.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Trash size={20} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListSpots;
