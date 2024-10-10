
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import "./FormSpotRegistration.css";

function FormSpotRegistration() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { axiosInstance, checkAuth } = useAxios();
  const [spots, setSpots] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const latitude = watch("latitude");
  const longitude = watch("longitude");
  const [geolocality, setGeolocality] = useState("");

  useEffect(() => {
    console.log("Latitude:", latitude, "Longitude:", longitude);
    if (latitude && longitude) {
      setGeolocality(`https://www.google.com/maps/?q=${latitude},${longitude}`);
    }
  }, [latitude, longitude]);

  
  async function addSpot(data) {
    if (!checkAuth()) return;

    try {

          const dataSpots = {
        usuario_id: userId,
        nome: data.name,
        descricao: data.descricao,
        localidade: data.address,
        cep: data.cep,
        coordenadas_geograficas: JSON.stringify({
          lat: data.latitude,
          lon: data.longitude,
        }),
      };
  
      console.log("Dados a serem enviados:", dataSpots); 

      await axiosInstance.post("/locais", dataSpots);
      alert("Local cadastrado com sucesso!");
      reset();
      navigate("/locais");
    } catch (error) {
      console.error("Houve um erro ao cadastrar o local:", error.response ? error.response.data : error.message);
      alert("Houve um erro ao cadastrar o local");
    }
  }

  async function getAddress(cep) {
    try {
      const response = await axiosInstance.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      const fullAddress = `${data.logradouro}, ${data.bairro}, ${data.localidade}/${data.uf}`;

      const geoResponse = await axiosInstance.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`
      );
      const geoData = geoResponse.data;

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

  async function getAddressFromRP(reference) {
    try {
      const geoSpot = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(reference)}`
      );
      const geoData = await geoSpot.json();

      if (geoData && geoData.length > 0) {
        const location = geoData[0];

        setValue("latitude", location.lat);
        setValue("longitude", location.lon);
        setValue("address", location.display_name);
        setValue("cep", location.address.postcode || "");
      } else {
        console.error("Nenhum dado encontrado para o ponto de referência:", reference);
      }
    } catch (error) {
      console.error("Erro ao buscar ponto de referência:", error);
    }
  }

 

  return (
    <div className="divspotregistration">
      <div className="imgh1spotregistration">
        <h1 className="h1spotregistration">Cadastre um Local</h1>
      </div>

      <form className="formspotregistration" onSubmit={handleSubmit(addSpot)}>
        <div className="blocform">
          <label>
            Nome *
            <input
              className="inputspotregistration2"
              placeholder="Digite o nome do local"
              {...register("name", { required: "Nome é obrigatório" })}
              onBlur={async (e) => {
                console.log("onBlur triggered", e.target.value);
                await getAddressFromRP(e.target.value);
              }}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </label>
        </div>
        <div className="blocform">
          <label>
            Descrição *
            <textarea
              className="textspotregistration"
              placeholder="Digite a descrição do local"
              {...register("descricao", { required: "Descrição é obrigatória" })} 
            />
            {errors.descricao && <p>{errors.descricao.message}</p>} 
          </label>
        </div>
        <div className="blocform">
          <label className="cepspotsregistration">
            CEP
            <input
              className="inputspotregistration2"
              placeholder="Digite o CEP"
              {...register("cep", {
                validate: async (value) => {
                  await getAddress(value);
                  return true;
                },
              })}
              onBlur={(e) => getAddress(e.target.value)}
            />
            {errors.cep && <p>{errors.cep.message}</p>}
          </label>
        </div>
        <div className="blocform">
          <label>
            Endereço *
            <input
              placeholder="Endereço"
              className="inputspotregistration2"
              {...register("address", { required: "Endereço é obrigatório" })}
            />
            {errors.address && <p>{errors.address.message}</p>}
          </label>
          <div className="blocform2"></div>
          <div className="blocform">
            <label>
              Longitude *
              <input
                placeholder="Longitude"
                {...register("longitude", {
                  required: "Longitude é obrigatória",
                })}
              />
              {errors.longitude && <p>{errors.longitude.message}</p>}
            </label>
            <label>
              Latitude *
              <input
                className="inputspotregistration"
                placeholder="Latitude"
                {...register("latitude", {
                  required: "Latitude é obrigatória",
                })}
              />
              {errors.latitude && <p>{errors.latitude.message}</p>}
            </label>
          </div>

          <div className="geolocalizacao">
            <label className="pspotregistration">
              {geolocality && (
                <p>
                  <a
                    href={geolocality}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver no Google Maps
                  </a>
                </p>
              )}
            </label>
          </div>
        </div>
        <div className="blocform2">
          <label>
            ID do Usuário
            <input
              placeholder="ID do Usuário"
              {...register("user_id")}
              defaultValue={userId}
              disabled
            />
          </label>
        </div>
        <button className="btnspotregistration" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default FormSpotRegistration;