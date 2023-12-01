import { useState, useCallback } from "react";

const useFetch = (url, reqMethod) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (body = null) => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: reqMethod,
          headers: {
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : null,
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [url, reqMethod]
  );

  return { data, loading, error, fetchData };
};

export default useFetch;
