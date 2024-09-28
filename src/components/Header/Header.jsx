import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';


const Header = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <header className="Header">
      <div className="Header--navLeft">
       <div className="logodash" />
        <nav>
          <Link to="/dashboard">Dashboard: Todos os Locais</Link>
          <Link to="/locais">Meus Locais</Link>
          <Link to="/local">Cadastrar Local</Link>
          <button onClick={signOut}><LogOut />Sair</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;