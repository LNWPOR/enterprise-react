import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch<T>(url: string): T[] {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<T[]>(url);

      setData(data);
    };

    fetchData();
  }, [url]);

  return data;
}

export default useFetch;
