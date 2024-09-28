import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import "./FormSignin.css";

function FormSignin() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function onSubmit(data) {
    try {
      const isSuccess = await signIn(data);
      if (isSuccess) {
        navigate("/dashboard");
      } else {
        alert("Usuário ou senha incorretos");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSignup() {
    navigate("/cadastro");
  }

  return (
    <div className="divSignin">
      <div className="imgh1signin">
        <h1 className="h1signin">Entrar</h1>
        <img
          className="logotripflowformsignin"
          src="/public/logotrip.png"
          alt="Logo"
        />
      </div>
      <form className="formSignin" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" type="text" {...register("email")} />
        <input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <button className="btnsignin" type="submit">
          Entre
        </button>
        <div className="pbtnsignup">
          <p className="pSignup">Ainda não está cadastrado?</p>
          <button className="btnsignup" onClick={handleSignup} type="button">
            Cadastre-se
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormSignin;
