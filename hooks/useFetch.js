import axios from 'axios';
import { useState, useEffect } from 'react';
// import { RAPID_API_KEY } from '@env';

const useFetch = (endPoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const rapidApiKey = RAPID_API_KEY;
  const rapidApiKey = 'c59793d44fmsh83b924a002a55bfp13a5dbjsn4e9d28abac13';
  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    params: { ...query },
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': '7a3fd20375mshefa4be7dab5455fp117adajsne7681e95b4e6',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      let localData = await getJobLocal(query.local);
      if (localData) {
        setData(localData);
        // alert('local data was fetched');
      } else {
        const response = await axios.request(options);
        let d = response.data.data;
        setData(d);
        await saveToFile(query.local, d);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error?.response?.message || 'error fetching');
      alert('Error occured');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const saveToFile = async (name, data) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/jobs/create',
        { name, data }
      );
      if (response) {
        // alert('result saved successfully');
      } else {
        setError('unable to save result');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getJobLocal = async (name) => {
    if (!name) return false;
    try {
      let qName = slugify(name);
      const response = await axios.get(
        `http://localhost:4000/api/jobs/${qName}`
      );
      if (response) {
        return response.data?.jobs;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
  const slugify = (str) =>
    str
      ?.toLowerCase()
      ?.trim()
      ?.replace(/[^\w\s-]/g, '')
      ?.replace(/[\s_-]+/g, '-')
      ?.replace(/^-+|-+$/g, '');
  return { data, isLoading, error, refetch };
};

export default useFetch;
