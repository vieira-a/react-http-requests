import './App.css'

import { useState, useEffect } from 'react'

function App() {

  const url = 'http://localhost:3000/persons'
  
  const [database, setDatabase] = useState([]);
  const [name, setName] = useState('');

  /**
   * Basic fetch data using useEffect hook
   * HTTP method GET
   */
  useEffect(() => {
   
    async function fetchData() {

      const response = await fetch(url);

      const data = await response.json();

      setDatabase(data)

    }
    
    fetchData()

  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault();

    const person = {
      name,
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person)
    });

    console.log()
  }


  return (

    <div className="App">
      <div className="person-list">
        <ul>
          {database.map((person)=>(
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
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
