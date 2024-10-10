import "./ListSpots.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash, Edit, Eye } from "lucide-react";
import { useAxios } from "../../hooks/useAxios";

function ListSpots() {
  // const [spots, setSpots] = useState([]);
  const [localSpots, setLocalSpots] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id || null;

  useEffect(() => {
    const token = localStorage.getItem("token");
  if (!token) {
    alert("Você precisa estar autenticado para acessar esta página.");
    // redirecionar para a página de login, se necessário
    return;
  }
 const getSpots = async () => {
          try {
            const response = await useAxios.get("/locais");
        const data = response.data.map(spot => ({
          id: spot.id,
          name: spot.nome,
          description: spot.descrição,
          address: spot.localidade,
          geoLocality: spot.coordenadas_geograficas,
          latitude: spot.coordenadas_geograficas.lat,
          longitude: spot.coordenadas_geograficas.lon,
          user_id: spot.usuario_id
        }));
        // setSpots(data);
        setLocalSpots(data);
        // setLocalSpots(data.filter(spot => spot.user_id === userId));
      } catch (error) {
        console.error('Erro ao buscar locais', error);
      }
    };

    getSpots();
  }, [userId]);

  async function deleteSpot(id) {
    // const spot = localSpots.find((spot) => spot.id === id);
    // if (spot.user_id !== userId) {
    //   alert("Você não tem permissão para excluir este local");
    //   return;
    // }

    const confirmation = window.confirm(
      "Tem certeza de que deseja excluir este local?"
    );
    if (!confirmation) {
      return;
    }

    try {
      const response = await useAxios.delete(`/locais/${id}`);
      if (response.status !== 200) {
        console.error("Erro na resposta da API:", response.statusText);
        alert("Erro ao apagar local");
        return;
      }

      alert("Local apagado com sucesso!");
      // setLocalSpots(localSpots.filter((spot) => spot.id !== id));
      setLocalSpots(prevLocalSpots => prevLocalSpots.filter((spot) => spot.id !== id));
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
            {/* <th>Ver no Mapa</th> */}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
        {localSpots.map((spot) => (
            <tr key={spot.id} className="list-category">
              <td>{spot.name}</td>
              <td>{spot.address}</td>
              {/* <td>{new Date(spot.visitDate).toLocaleDateString()}</td> */}
              {/* <td>
                <a
                  href={`https://www.google.com/maps/?q=${spot.geolocality}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no Mapa
                </a>
              </td> */}
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
