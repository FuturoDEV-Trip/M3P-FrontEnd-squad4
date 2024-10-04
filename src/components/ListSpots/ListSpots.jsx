import "./ListSpots.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash, Edit, Eye } from "lucide-react";
import axios from "axios"; // Importando o axios

function ListSpots() {
  const [localSpots, setLocalSpots] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const apiBaseUrl = "http://localhost:3000"; // URL base da sua API

  useEffect(() => {
    const fetchSpots = async () => {
      const token = localStorage.getItem("token");
      console.log("Token usado na requisição:", token); // Verifique o token

      if (!token) {
        alert("Você precisa estar logado para acessar esta página.");
        return; // ou redirecionar para login
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/destinos`, {
          headers: {
            authorization: token,
          },
        });

        if (response.status === 200) {

          
          const mappedSpots = response.data.map((spot) => {
            // let coordinates = { lat: null, lon: null };
        
            // try {
            //     coordinates = JSON.parse(spot.coordenadas_geograficas);
            // } catch (e) {
            //     console.error("Erro ao analisar coordenadas:", e);
            // }
        
            return {
                id: spot.id,
                name: spot.nome_do_destino,
                description: spot.descricao,
                address: spot.localidade,
                geoLocality: spot.coordenadas_geograficas,
                latitude: spot.coordenadas_geograficas.lat,
                longitude:  spot.coordenadas_geograficas.lon,
                user_id: spot.usuario_id,
            };
        });
          
          setLocalSpots(mappedSpots);
        } else {
          alert("Erro ao buscar os destinos");
        }
      } catch (error) {
        console.error("Houve um erro ao buscar os destinos:", error.response?.data || error);
        alert("Houve um erro ao buscar os destinos");
        
      }
    };

    fetchSpots();
  }, []);

  const userSpots = localSpots.filter((spot) => spot.user_id === userId);

  const deleteSpot = async (id) => {
    const confirmation = window.confirm("Tem certeza de que deseja excluir este local?");
    if (!confirmation) {
        return;
    }

    const token = localStorage.getItem("token");
    console.log("Token antes da deleção:", token); // Verifique se o token está correto

    if (!token) {
        alert("Você precisa estar logado para excluir um local.");
        return;
    }

    try {
        const response = await axios.delete(`${apiBaseUrl}/destinos/${id}`, {
            headers: {
                Authorization: token,
            },
        });

        if (response.status === 204) {
            setLocalSpots(prevSpots => prevSpots.filter((spot) => spot.id !== id));
            alert("Local apagado com sucesso!");
        } else {
            alert("Erro ao apagar local");
        }
    } catch (error) {
        console.error("Houve um erro ao apagar o local:", error.response ? error.response.data : error);
        
        if (error.response && error.response.status === 401) {
            alert("Sessão expirada ou não autorizado. Por favor, faça login novamente.");
            // Aqui você pode redirecionar para a página de login, se necessário
        } else {
            alert("Houve um erro ao apagar o local");
        }
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