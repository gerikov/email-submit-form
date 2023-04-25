import { useState } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '') {
      alert('fields are empty');
      return;
    }

    if (!isValidEmail(email)) {
      alert('email is not valid');
      return;
    }

    //send request
    try {
      const { data } = await axios.post('http://localhost:5000/register', {
        name,
        email,
      });
      if (data) {
        setMessage('successful!');
      } else {
        setMessage('We cannot create user!');
      }
    } catch (err) {
      setMessage('We cannot create user!');
    }
  };

  return (
    <div className='app'>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>
            Name
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor='email'>
            Email
            <input
              type='text'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <input type='submit' value='Submit' className='submitButton' />
        </form>
        {message && <div>{message}</div>}
      </div>
    </div>
  );
}

export default App;
