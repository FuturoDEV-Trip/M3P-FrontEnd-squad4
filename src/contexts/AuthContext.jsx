import { createContext, useState } from "react";
import PropTypes from "prop-types";
// import { api } from "../services/api";
import axios from 'axios';

export const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const userStorage = localStorage.getItem("user");

    if (userStorage) {
      return JSON.parse(userStorage);
    }
    return null;
  });
  async function signIn({ email, password }) {
    try {

      const response = await axios.post("http://localhost:3000/login", { //revisar
        email, 
        password, 
      })       
    
      if(response.status === 200){
        const { id, email, nome } = response.data.user;
        const userData = { id, email, nome };
        //configura localstorage
              localStorage.setItem('token', response.data.Token)
              localStorage.setItem('user',JSON.stringify(userData)) //tem que transformar em json. Revisar se salva no localstorage o user no back
         setUser(userData);
       
        return true;
            }
      // const response = await api(`/users?email=${email}`);
      // const data = await response.json();

      // if (data.length > 0) {
      //   const usuario = data[0];

      //   if (usuario.password === password) {
      //     setUser(usuario);
      //     localStorage.setItem("@tripflow:user", JSON.stringify(usuario));
      //     return true;
      //   }
      // }
    } catch (error) {
      console.error("Erro ao autenticar", error);
      return false; // Retorna falha
    }

  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
