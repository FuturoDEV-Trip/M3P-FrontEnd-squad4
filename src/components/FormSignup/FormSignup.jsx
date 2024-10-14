import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api"
import "./FormSignup.css";

function FormSignup() {
  const {     register,    handleSubmit,    setValue,  formState: { errors }, reset, } = useForm();
  const navigate = useNavigate();

  async function addUser(data) {
    try {

      const resposta = await api("/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!resposta.status === 200) {
        alert("Erro ao cadastrar usuário");
      } else {
        alert("Usuário cadastrado com sucesso!");
        reset();
        navigate("/login");
      }
    } catch (error) {
      alert("Houve um erro ao cadastrar o usuário");
    }
  }

  async function getAddress(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      const fullAddress = `${data.logradouro}, ${data.bairro}, ${data.localidade}/${data.uf}`;
      setValue("endereco", fullAddress);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSignin() {
    navigate("/login");
  }

  return (
    <div className="divSignup">
    
      <div className="imgh1Signup">
        <img
          className="logotripflowformsignin"
          src="/logotrip.png"
          alt="Logo"
        />
        <h1 className="h1Signup">Cadastre-se</h1>
      </div>

      <form className="formSignup" onSubmit={handleSubmit(addUser)}>
        <div className="inputsdivSignup">
          <label>
            Nome *
            <input
              className="inputSignup"
              placeholder="Digite seu nome completo"
              name="nome"
              {...register("nome", {
                required: "Nome é obrigatório",
                validate: (value) =>
                  value.split(" ").length > 1 ||
                  "Faltou o sobrenome. Nome deve ter pelo menos duas palavras",
              })}
            />
            {errors.nome && <p>{errors.nome.message}</p>}
          </label>

          <label>
            CPF *
            <input
              className="inputSignup2"
              placeholder="Digite seu CPF"
              name="cpf"
              {...register("cpf", {
                required: "CPF é obrigatório",
                validate: (value) =>
                  value.length === 11 ||
                  value.length === 14 ||
                  "CPF deve ter 11 ou 14 dígitos se trouxer ponto e traço",
              })}
            />
            {errors.cpf && <p>{errors.cpf.message}</p>}
          </label>

          <label>
            Data de Nascimento *
            <input
              className="inputSignup2"
              name="data_nascimento"
              type="date"
              {...register("data_nascimento", {
                required: "Data de Nascimento é obrigatória",
              })}
            />
            {errors.data_mascimento && <p>{errors.data_mascimento.message}</p>}
          </label>
          <label>
            Sexo
            <select className="inputSignup2" name="sexo" {...register("sexo")}>
              <option value="">Selecione</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </select>
            {errors.sexo && <p>{errors.sexo.message}</p>}
          </label>
          <label>
            CEP *
      
<input
  className="inputSignup2"
  placeholder="Digite seu CEP"
  name="cep"
  {...register("cep", {
    required: "CEP é obrigatório",
    validate: {
      isEightDigits: value => 
        /^\d{8}$/.test(value) || "CEP deve ter exatamente 8 dígitos",
      validAddress: async value => {
        const address = await getAddress(value);
        return address || "Endereço inválido"; // Ajuste conforme a lógica do seu getAddress
      },
    },
  })}
  onBlur={async (e) => await getAddress(e.target.value)}
/>
{errors.cep && <p>{errors.cep.message}</p>}
          </label>
          <label>
            Endereço *
            <input
              placeholder="Endereço"
              className="inputSignup"
              name="endereco"
              {...register("endereco", { required: "Endereço é obrigatório" })}
            />
            {errors.endereco && <p>{errors.endereco.message}</p>}
          </label>

          <label>
            Número *
            <input
              className="inputSignup2"
              placeholder="Digite o número"
              name="numero"
              type="number"
              {...register("numero", {
                required: "Número é obrigatório",
              })}
            />
            {errors.numero && <p>{errors.numero.message}</p>}
          </label>

          <label>
            Complemento
            <input
              className="inputSignup"
              placeholder="Complemento"
              name="complemento"
              {...register("complemento")}
            />
            {errors.complemento && (
              <p>{errors.complemento.message}</p>
            )}
          </label>

          <label>
            Email *
            <input
              className="inputSignup"
              placeholder="Digite seu email"
              name="email"
              type="email"
              {...register("email", { required: "Email é obrigatório" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </label>

          <label>
            Senha *
            <input
              className="inputSignup"
              placeholder="Senha com pelo menos 8 dígitos"
              name="password"
              type="password"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 8,
                  message: "Senha deve ter pelo menos 8 caracteres",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </label>

          <button className="btnSignup" type="submit">
            Cadastrar
          </button>
<div className="pbtnsignup">
          <p className="pSignin">Já está cadastrado?</p>
          <button className="btnSignin" onClick={handleSignin} type="button">
            Faça Login
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormSignup;
