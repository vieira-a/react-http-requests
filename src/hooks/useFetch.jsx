import { useEffect, useState } from "react"

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null); 
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemId, setItemId] = useState(null);

  const httpConfig = (data, method) => {
    if(method === "POST"){
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data)
      })
      setMethod(method)
    } else if(method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        }
      })
      setItemId(data)
      setMethod(method)
    }
  }
  //GET
  useEffect(()=> {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error.message)
        setError('Houve um erro ao carregar os dados.')
      }

      setLoading(false);
    }
    fetchData();
  }, [url, callFetch]) 

  //POST
  useEffect(() => {
    const httpRequest = async () => {
      
      if(method === "POST"){
        let fetchOptions = [url, config]
        const response = await fetch(...fetchOptions)
        const json = await response.json()
        setCallFetch(json)

      } else if(method === "DELETE") {
        const urlDelete = `${url}/${itemId}`
        const response = await fetch(urlDelete, config)
        const json = await response.json()
        setCallFetch(json)
      }
    }
    httpRequest()
  }, [config, method, url])

  /**
   * My own solution
   *  
  const handleDelete = async (e) => {
    let id = e.target.id
    let NEW_URL = `${url}/${id}`
    const response = await fetch(NEW_URL, { method: 'DELETE'})
    const json = await response.json()
    setCallFetch(json)
  }
  */
  
  return {data, httpConfig, loading, error}

}