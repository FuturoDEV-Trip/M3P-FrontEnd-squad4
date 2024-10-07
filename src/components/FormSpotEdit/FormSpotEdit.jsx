import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from '../../hooks/useAxios';
import "./FormSpotEdit.css";

function FormSpotEdit() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const { axiosInstance, checkAuth } = useAxios();

  useEffect(() => {
    if (!checkAuth()) return; // Verifica se o usuário está autenticado

    const getSpot = async () => {
      try {
        const response = await axiosInstance.get(`/locais/${id}`);
        if (response.data && JSON.stringify(response.data) !== JSON.stringify(spot)) {
          setSpot(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar local:", error);
      } finally {
        setLoading(false);
      }
    };

    getSpot();
  }, [id, axiosInstance, checkAuth, spot]);

  useEffect(() => {
    if (spot) {
      setValue("name", spot.nome);
      setValue("description", spot.descricao);
      setValue("cep", spot.cep);
      setValue("address", spot.localidade);
      setValue("latitude", spot.coordenadas_geograficas.lat);
      setValue("longitude", spot.coordenadas_geograficas.lon);
      setValue("user_id", spot.usuario_id);
    }
  }, [spot, setValue]);

  async function editSpot(data) {
    if (!spot) {
      alert("Local não encontrado.");
      reset();
      return;
    }

    const dataSpots = {
      usuario_id: spot.usuario_id,
      nome: data.name,
      descricao: data.description,
      localidade: data.address,
      cep: data.cep,
      coordenadas_geograficas: JSON.stringify({
        lat: data.latitude,
        lon: data.longitude,
      }),
    };
    
    try {
      await axiosInstance.put(`/locais/${id}`, dataSpots, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Local atualizado com sucesso!");
      reset();
      navigate("/locais");
    } catch (error) {
      console.error("Houve um erro ao atualizar o local:", error);
      alert("Houve um erro ao atualizar o local.");
    }
  }

  async function getAddress(cep) {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const fullAddress = `${data.logradouro}, ${data.bairro}, ${data.localidade}/${data.uf}`;
      const { data: geoData } = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`
      );

      if (geoData && geoData.length > 0) {
        const location = geoData[0];
        setValue("latitude", location.lat);
        setValue("longitude", location.lon);
      }

      setValue("address", fullAddress);
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return spot ? (
    <div className="divspotedit">
      <div className="imgh1spotedit">
        <h1 className="h1spotedit">Editar Local</h1>
      </div>

      <form className="formspotedit" onSubmit={handleSubmit(editSpot)}>
   
        <div className="blocform">
          <label>
            Nome *
            <input
              className="inputspotedit2"
              placeholder="Digite o nome do local"
              {...register("name", { required: "Nome é obrigatório" })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </label>
        </div>

        <div className="blocform">
          <label>
            Descrição *
            <textarea
              className="textspotedit"
              placeholder="Digite a descrição do local"
              {...register("description", {
                required: "Descrição é obrigatória",
              })}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </label>
        </div>

        <div className="blocform3">
          <label className="cepspotsedit">
            CEP
            <input
              className="inputspotedit"
              placeholder="Digite o CEP"
              {...register("cep", {
                validate: async (value) => {
                  if (value.length !== 8) {
                    return "CEP deve ter 8 dígitos, sem hífen.";
                  }
                  await getAddress(value);
                  return true;
                },
              })}
              onBlur={(e) => getAddress(e.target.value)}
            />
            {errors.cep && <p>{errors.cep.message}</p>}
          </label>
        </div>

        <label>
          Endereço/ Localidade *
          <input
            placeholder="Endereço"
            className="inputspotedit2"
            {...register("address", { required: "Endereço é obrigatório" })}
          />
          {errors.address && <p>{errors.address.message}</p>}
        </label>
        <div className="blocform2">
          <div className="latlong">
            <label>
              Longitude *
              <input
                className="inputspotedit"
                placeholder="Longitude"
                {...register("longitude", {
                  required: "Longitude é obrigatória",
                })}
              />
              {errors.longitude && <p>{errors.longitude.message}</p>}
            </label>
          </div>
          <div className="latlong">
            <label>
              Latitude *
              <input
                className="inputspotedit"
                placeholder="Latitude"
                {...register("latitude", {
                  required: "Latitude é obrigatória",
                })}
              />
              {errors.latitude && <p>{errors.latitude.message}</p>}
            </label>
          </div>
        </div>
        <div className="blocform2">
          <label>
            ID do Usuário
            <input
              placeholder="ID do Usuário"
              {...register("user_id")}
              defaultValue={spot.usuario_id}
              disabled
            />
          </label>
        </div>
        <button className="btnspotedit" type="submit">
          Salvar modificações
        </button>
      </form>
    </div>
  ) : (
    <div>Local não encontrado.</div>
  );
}

export default FormSpotEdit;