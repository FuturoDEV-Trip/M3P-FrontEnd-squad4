import React, { useContext } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../../contexts/AuthContext';
import { LogOut, LogIn } from 'lucide-react';


const Header = () => {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const clickSignOut = () => {
    signOut();
    navigate('/dashboard');
  };

  const clickSignIn = () => {
    navigate('/login');
  };


    const isLoggedIn = !!localStorage.getItem('token');

  return (
    <header className="Header">
      <div className="Header--navLeft">
       <div className="logodash" />
        <nav>
          <Link to="/dashboard">Dashboard: Todos os Locais</Link>
          {isLoggedIn && (
            <>
              <Link to="/locais">Meus Locais</Link>
              <Link to="/local">Cadastrar Local</Link>
            </>
          )}
      {isLoggedIn ? (
            <button onClick={clickSignOut}><LogOut /> Sair</button>
          ) : (
            <>
              <Link to="/cadastro">Cadastre-se aqui</Link>
              <button onClick={clickSignIn}><LogIn /> Login</button>

            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;