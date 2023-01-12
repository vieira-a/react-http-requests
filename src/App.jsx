import './App.css'

import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch';

function App() {

  const url = 'http://localhost:3000/persons'

  /**
   * Advanced Fetch data using custom hook
   */
  const { data: item, httpConfig, loading, error, handleDelete, handleEdit } = useFetch(url);
  
  const [name, setName] = useState('');

  const handleRemove = (id) => {
    httpConfig(id, "DELETE")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const person = {
      name,
    }
    
    /**
     * POST with custom hook
     */
    httpConfig(person, "POST")
    setName('')
  }


  return (

    <div className="App">
      <div className="person-list">
        {loading && <p>Carregando dados...</p>}
        {error && <p>{error}</p>}
        {!error && (
          <ul className='data-list'>
            {item && item.map((person)=>(
              <div className='data-item' key={person.id}>
                <li>{person.name}</li>
                <button id={person.id} onClick={handleEdit}>Editar</button>
                <button onClick={() => handleRemove(person.id)}>Excluir</button>
              </div>
              
            ))}
          </ul>
        )}
      </div>
      <div className="person-register">
        <form onSubmit={handleSubmit} >
          <label>Name</label>
          <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)}/>
          
          {loading && <input disabled type="submit" value="Aguarde"/>}
          {!loading && <input type="submit"/>}
          
        </form>
      </div>
    </div>    
  )
}

export default App
