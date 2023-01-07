import { useEffect, useState } from "react"

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null); 
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [loading, setLoading] = useState(false);

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
    }
  }
  //GET
  useEffect(()=> {
    setLoading(true);
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
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
      }
    }
    httpRequest()
  }, [config, method, url])
  
  return {data, httpConfig, loading}

}