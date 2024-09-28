import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSpots } from "../../hooks/useSpots";
import "./FormSpotEdit.css";
import { api } from "../../services/api";

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
  const spots = useSpots();
  const user = JSON.parse(localStorage.getItem("@tripflow:user"));
  const userId = user?.id;
  const latitude = watch("latitude");
  const longitude = watch("longitude");
  const { id } = useParams();
  const spot = spots.find((spot) => spot.id === id);
  const [geolocality, setGeolocality] = useState("");

  useEffect(() => {
    if (latitude && longitude) {
      setGeolocality(`https://www.google.com/maps/?q=${latitude},${longitude}`);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (spot) {
      setValue("name", spot.name);
      setValue("description", spot.description);
      setValue("visitDate", spot.visitDate);
      setValue("cep", spot.cep);
      setValue("address", spot.address);
      setValue("latitude", spot.latitude);
      setValue("longitude", spot.longitude);
      setValue("attractionCategory", spot.attractionCategory);
      setValue("visibility", spot.visibility);
      setValue("adventureLevel", spot.adventureLevel);
      setValue("cost", spot.cost);
      setValue("rate", spot.rate);
      setValue("accessibility", spot.accessibility);
      setValue("selectiveWasteCollection", spot.selectiveWasteCollection);
    }
  }, [spot, setValue]);

  async function editSpot(data) {
    try {
      if (userId !== spot.user_id) {
        alert("Você não tem permissão para editar este local");
        return;
      }
      const dataSpots = {
        ...data,
        user_id: userId,
      };

      const response = await api(`/spots/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSpots),
      });

      if (!response.ok) {
        console.error("Erro na resposta da API:", await response.text());
        alert("Erro ao atualizar local");
        return;
      }

      alert("Local atualizado com sucesso!");
      reset();
      navigate("/locals");
    } catch (error) {
      console.error("Houve um erro ao atualizar o local:", error);
      alert("Houve um erro ao atualizar o local");
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
  return spot ? (
    <div className="divspotedit">
      <div className="imgh1spotedit">
        <h1 className="h1spotedit">Editar Local</h1>
      </div>

      <form className="formspotedit" onSubmit={handleSubmit(editSpot)}>
      <div className="blocform">
         {/* <div className="inputsdivspotedit"> */}
          <label>
            Nome *
            <input
              className="inputspotedit2"
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
{/* 
        <div className="inputsdivspotedit"> */}
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
        <div className="blocform2">
        {/* <div className="inputsdivspoteditlatlon"> */}
          <label className="avaliacao">
            Avaliação *
            <select
              {...register("rate", { required: "Avaliação é obrigatória" })}
            >
              <option value="">Selecione</option>
              <option key={1} value={1}>
                1
              </option>
              <option key={2} value={2}>
                2
              </option>
              <option key={3} value={3}>
                3
              </option>
              <option key={4} value={4}>
                4
              </option>
              <option key={5} value={5}>
                5
              </option>
              <option key={6} value={6}>
                6
              </option>
              <option key={7} value={7}>
                7
              </option>
              <option key={8} value={8}>
                8
              </option>
              <option key={9} value={9}>
                9
              </option>
              <option key={10} value={10}>
                10
              </option>
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
        </div>
        <div className="inputsdivspoteditlatlon">
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
        </div>
        <div className="blocform3">
        {/* <div className="inputsdivspoteditlatlon"> */}
          <label className="cepspotsedit">
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
              className="inputspotedit2"
              {...register("address", { required: "Endereço é obrigatório" })}
            />
            {errors.address && <p>{errors.address.message}</p>}
          </label>
        </div>

        {/* <div className="inputsdivspoteditlatlon"> */}
        <div className="blocform2">
          <div className="addressnumber">
            <label>
              Número
              <input
                placeholder="Número, se houver"
                {...register("addressNumber")}
              />
            </label>
          </div>

          <div className="latlong">
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
          <div className="latlong">
            <label>
              Latitude *
              <input
                className="latlong"
                placeholder="Latitude"
                {...register("latitude", {
                  required: "Latitude é obrigatória",
                })}
              />
              {errors.latitude && <p>{errors.latitude.message}</p>}
            </label>
          </div>
          <div className="geolocalizacao">
            <label className="pspotedit">
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

        <button className="btnspotedit" type="submit">
          Salvar modificações
        </button>
      </form>
    </div>
  ) : (
    <div>Carregando...</div>
  );
}

export default FormSpotEdit;
