import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSpots } from "../../hooks/useSpots";
import "./FormSpotRegistration.css";
import { api } from "../../services/api";

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
  const spots = useSpots();
  const user = JSON.parse(localStorage.getItem("@tripflow:user"));
  const userId = user?.id;
  const latitude = watch("latitude");
  const longitude = watch("longitude");
  const [geolocality, setGeolocality] = useState("");

  useEffect(() => {
    if (latitude && longitude) {
      setGeolocality(`https://www.google.com/maps/?q=${latitude},${longitude}`);
    }
  }, [latitude, longitude]);

  async function addSpot(data) {
    try {
      const existingSpot = spots.find((spot) => spot.name === data.name);
      if (existingSpot) {
        alert("Local já cadastrado com o mesmo nome");
        return;
      }

      const dataSpots = {
        ...data,
        user_id: userId,
      };

      const response = await api("/spots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSpots),
      });

      if (!response.ok) {
        console.error("Erro na resposta da API:", await response.text());
        alert("Erro ao cadastrar local");
        return;
      }

      alert("Local cadastrado com sucesso!");
      reset();
      navigate("/locals");
    } catch (error) {
      console.error("Houve um erro ao cadastrar o local:", error);
      alert("Houve um erro ao cadastrar o local");
    }
  }

  async function getAddress(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      const fullAddress = `${data.logradouro}, ${data.bairro}, ${data.localidade}/${data.uf}`;

      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          fullAddress
        )}`
      );
      const geoData = await geoResponse.json();

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
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          reference
        )}`
      );
      const geoData = await geoSpot.json();

      if (geoData && geoData.length > 0) {
        const location = geoData[0];

        setValue("latitude", location.lat);
        setValue("longitude", location.lon);
        setValue("address", location.display_name);
        setValue("cep", location.address.postcode || "");
      } else {
        console.error(
          "Nenhum dado encontrado para o ponto de referência:",
          reference
        );
      }
    } catch (error) {
      console.error(
        "Erro ao buscar endereço a partir do ponto de referência:",
        error
      );
    }
  }
  return (
    <div className="divspotregistration">
      <div className="imgh1spotregistration">
        <h1 className="h1spotregistration">Cadastre um Local</h1>
      </div>

      <form className="formspotregistration" onSubmit={handleSubmit(addSpot)}>
        {/* <div className="inputsdivspotregistration"> */}
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
          <label>
            Data da Visita *
            <input
              type="date"
              {...register("visitDate", {
                required: "Data da visita é obrigatória",
              })}
            />
            {errors.visitDate && <p>{errors.visitDate.message}</p>}
          </label>
          </div>
        {/* </div> */}

        {/* <div className="inputsdivs potregistration"> */}
        <div className="blocform">
             <label>
            Descrição *
            <textarea
              className="textspotregistration"
              placeholder="Digite a descrição do local"
              {...register("description", {
                required: "Descrição é obrigatória",
              })}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </label>
        </div>
        {/* <div className="inputsdivspotregistrationlatlon"> */}
        <div className="blocform2">
          <label className="avaliacao">
            Avaliação *
            <select
              {...register("rate", { required: "Avaliação é obrigatória" })}
            >
              <option value="">Selecione</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {errors.rate && <p>{errors.rate.message}</p>}
          </label>

          <div className="labeloption">
            <label>
              Categoria *
              <select
                {...register("attractionCategory", {
                  required: "Categoria da atração é obrigatória",
                })}
              >
                <option value="">Selecione</option>
                <option value="natural">Natural</option>
                <option value="urbana">Urbana</option>
              </select>
              {errors.attractionCategory && (
                <p>{errors.attractionCategory.message}</p>
              )}
            </label>
          </div>

          <div className="labeloption">
            <label>
              Visibilidade *
              <select
                {...register("visibility", {
                  required: "Visibilidade é obrigatória",
                })}
              >
                <option value="">Selecione</option>
                <option value="private">Privado</option>
                <option value="public">Público</option>
              </select>
              {errors.visibility && <p>{errors.visibility.message}</p>}
            </label>
          </div>
          <div className="labeloption">
            <label>
              Custo
              <select {...register("cost")}>
                <option value="">Selecione</option>
                <option value="gratuito">Gratuito</option>
                <option value="barato">Barato</option>
                <option value="mediano">Mediano</option>
                <option value="caro">Caro</option>
              </select>
              {errors.cost && <p>{errors.cost.message}</p>}
            </label>
          </div>
        {/* </div> */}
        {/* <div className="inputsdivspotregistrationlatlon"> */}
          <label>
            Nível de Aventura
            <select {...register("adventureLevel")}>
              <option value="">Selecione</option>
              <option value="radical">Radical</option>
              <option value="moderado">Moderado</option>
              <option value="tranquilo">Tranquilo</option>
            </select>
            {errors.adventureLevel && <p>{errors.adventureLevel.message}</p>}
          </label>

          <div className="labeloption">
            <label>
              Acessibilidade
              <select {...register("accessibility")}>
                <option value="">Selecione</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
              {errors.accessibility && <p>{errors.accessibility.message}</p>}
            </label>
          </div>
          <div className="labeloption">
            <label>
              Coleta Seletiva
              <select {...register("selectiveWasteCollection")}>
                <option value="">Selecione</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
              {errors.selectiveWasteCollection && (
                <p>{errors.selectiveWasteCollection.message}</p>
              )}
            </label>
          </div>
          <label>
            ID do Usuário
            <input
              placeholder="ID do Usuário"
              {...register("user_id")}
              defaultValue={userId}
              disabled
            />
          </label>
        {/* </div> */}
        </div>
        {/* <div className="inputsdivspotregistrationlatlon"> */}
        <div className="blocform3">
          <label className="cepspotsregistration">
            CEP
            <input
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

          <label>
            Endereço *
            <input
              placeholder="Endereço"
              className="inputspotregistration2"
              {...register("address", { required: "Endereço é obrigatório" })}
            />
            {errors.address && <p>{errors.address.message}</p>}
          </label>
        </div>
        <div className="blocform2">
        {/* <div className="inputsdivspotregistrationlatlon"> */}
          <div className="addressnumber">
            <label>
              Número
              <input
                placeholder="Número, se houver"
                {...register("addressNumber")}
              />
            </label>
          </div>

          <div className="inputspotregistration">
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
          </div>
          <div className="inputspotregistration">
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


        <button className="btnspotregistration" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default FormSpotRegistration;
