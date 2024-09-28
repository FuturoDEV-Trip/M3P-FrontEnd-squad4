import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { AuthContext } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';


const Menu = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <header className="Menu">
      <div className="Menu--navLeft">
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

export default Menu;