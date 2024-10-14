import { createContext, useState } from "react";
import PropTypes from "prop-types";
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
      const response = await axios.post("https://m3p-backend-squad4-34p5.onrender.com/login", { 
        email, 
        password, 
      })               

      if(response.status === 200){
        const { id, email, nome, isLogged } = response.data.user;
        const userData = { id, email, nome, isLogged: true };  // Atualize o estado do isLogged para true no login
        
        localStorage.setItem('token', response.data.Token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        return true;
      }
    } catch (error) {
      console.error("Erro ao autenticar", error);
      return false; 
    }
  }

  async function signOut() {
    const userId = user?.id;
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    try {
      if (userId) {
        await axios.post("https://m3p-backend-squad4-34p5.onrender.com/usuario/logout", { userId });
        await axios.put(`https://m3p-backend-squad4-34p5.onrender.com/usuario/${userId}`, { isLogged: false }); // Atualize o estado do isLogged para false no logout
      }
    } catch (error) {
      console.error("Erro ao deslogar", error);
    }
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
