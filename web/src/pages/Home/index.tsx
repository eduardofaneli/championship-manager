import './styles.css';
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Home = () => {

  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    try {
      // const response = await api.post('sessions', { id });

      // localStorage.setItem('ongId', id);
      // localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch {
      alert('Falha no login, tente novamente.')      
    }
  }

  function handleSelectID(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setId(value);
  }

  return(
    <div className="logon-container">
    <section className="form">
        {/* <img src="" alt="Championship" /> */}
        <form onSubmit={handleLogin}>
            <h1>Faça seu logon</h1>
            <input
                placeholder="Sua ID"
                value=""
                onChange={handleSelectID}
            />
            <button className="button" type="submit">Entrar</button>

            <Link className="back-link" to="/register">
                {/* <FiLogIn size={16} color="#E02041" /> */}
                Não tenho cadastro.
            </Link>
        </form>
    </section>
    {/* <img src={heroesImg} alt="Heroes" /> */}
</div>
  )
}

export default Home;