import { useState, useEffect } from 'react';
import useAxios from "./useAxios"
export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api=useAxios()
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/profile'); // replace with your actual API endpoint
        setUserData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
};


