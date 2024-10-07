import "./ListSpots.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash, Edit, Eye } from "lucide-react";
import useAxios from '../../hooks/useAxios';


function ListSpots() {
  const [localSpots, setLocalSpots] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const { axiosInstance, checkAuth } = useAxios();

  useEffect(() => {
    if (!checkAuth()) return;

    const fetchSpots = async () => {
      try {
        const response = await axiosInstance.get('/locais');
        const mappedSpots = response.data.map((spot) => ({
          id: spot.id,
          name: spot.nome,
          description: spot.descricao,
          address: spot.localidade,
          geoLocality: spot.coordenadas_geograficas,
          latitude: spot.coordenadas_geograficas.lat,
          longitude: spot.coordenadas_geograficas.lon,
          user_id: spot.usuario_id,
        }));
        setLocalSpots(mappedSpots);
      } catch (error) {
        console.error("Houve um erro ao buscar os locais:", error);
        alert("Houve um erro ao buscar os locais");
      }
    };

    fetchSpots();
  }, [checkAuth, axiosInstance]);

  const userSpots = localSpots.filter((spot) => spot.user_id === userId);

  const deleteSpot = async (id) => {
    const confirmation = window.confirm("Tem certeza de que deseja excluir este local?");
    if (!confirmation) {
      return;
    }

    try {
      await axiosInstance.delete(`/locais/${id}`);
      setLocalSpots(prevSpots => prevSpots.filter((spot) => spot.id !== id));
      alert("Local apagado com sucesso!");
    } catch (error) {
      console.error("Houve um erro ao apagar o local:", error);
      alert("Houve um erro ao apagar o local");
    }
  };

  return (
    <div className="listspots">
      <h1> MEUS LOCAIS</h1>
      <table className="list-categorias">
        <thead>
          <tr>
            <th>Local</th>
            <th>Endereço</th>
            <th>Ver no Mapa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {userSpots.map((spot) => (
            <tr key={spot.id} className="list-category">
              <td>{spot.name}</td>
              <td>{spot.address}</td>
              <td>
                <a
                  href={`https://www.google.com/maps/?q=${spot.latitude},${spot.longitude}`}
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
                <Link to={`/local/edit/${spot.id}`} style={{ marginRight: "10px" }}>
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