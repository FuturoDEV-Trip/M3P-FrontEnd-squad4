import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { api } from "../services/api";

export const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const userStorage = localStorage.getItem("@tripflow:user");

    if (userStorage) {
      return JSON.parse(userStorage);
    }

    return null;
  });
  async function signIn({ email, password }) {
    try {
      const response = await api(`/users?email=${email}`);
      const data = await response.json();

      if (data.length > 0) {
        const usuario = data[0];

        if (usuario.password === password) {
          setUser(usuario);
          localStorage.setItem("@tripflow:user", JSON.stringify(usuario));
          return true;
        }
      }
    } catch (error) {
      console.error("Erro ao autenticar", error);
    }

    return false;
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@tripflow:user");
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
