import './styles.css';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

// import logoImg from '../../assets/logo.svg';

interface Match {
  name: string;
  id: string;
  fights: string[];
}


const Profile = () => {  
  const [matchs, setMatchs] = useState<Match[]>([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api.get('matches',
      // {
      //   headers: {
      //     Authorization: ongId,
      //   }
      // }).then(response => {
    )
      .then(response => {
        setMatchs(response.data);        
      })
  }, [])  

  async function handleDeleteIncident(id: number) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      // setIncidents(incidents.filter(incident => incident.id !== id));

    } catch (error) {
      alert('Erro ao deletar caso, tente novamente.')

    }
  }

  async function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        {/* <img src="{logoImg}" alt="Be The Hero"></img> */}
        <span>Bem vinda {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {matchs.map(match => (
          <li key={match.id}>
            <strong>Lutador Principal:</strong>            
            <p>{match.name}</p>
            <strong>Primeira Luta:</strong>            
            <p>{match.fights[0]}</p>
            <strong>Segunda Luta:</strong>
            <p>{match.fights[1]}</p>
            <strong>Terceira Luta:</strong>
            <p>{match.fights[2]}</p>            
            {/* <button onClick={() => handleDeleteIncident(0)} type="button"><FiTrash2 size={20} color="#a8a8b3" /></button> */}
          </li>
        ))}       
      </ul>
    </div>
  )
}

export default Profile;