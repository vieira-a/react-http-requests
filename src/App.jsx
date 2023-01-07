import './App.css'

import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch';

function App() {

  const url = 'http://localhost:3000/persons'

  /**
   * Advanced Fetch data using custom hook
   */
  const { data: item, httpConfig, loading } = useFetch(url);
  
  const [name, setName] = useState('');

  /**
   * Basic fetch data using useEffect hook
   * HTTP method GET
   */
  /*
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      setDatabase(data)
    }
    fetchData()
  }, [])
  */
  
   /**
   * Basic submit data using async function
   * HTTP method POST
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const person = {
      name,
    }
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(person)
    // });
    // const personUpdated = await response.json();
    // //Update database to show itens on submit
    // setDatabase((prev) => [...prev, personUpdated])
    
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
        {!loading && (
          <ul>
            {item && item.map((person)=>(
              <li key={person.id}>{person.nameg}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="person-register">
        <form onSubmit={handleSubmit} >
          <label>Name</label>
          <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)}/>
          <input type="submit"/>
        </form>
      </div>
    </div>    
  )
}

export default App
