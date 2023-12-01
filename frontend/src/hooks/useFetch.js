import { useState, useCallback } from "react";

const useFetch = (url, reqMethod) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("user")).token;

  const fetchData = useCallback(
    async (body = null, id = null) => {
      setLoading(true);
      try {
        if (id) {
          url = `${url}/${id}`;
        }
        const response = await fetch(url, {
          method: reqMethod,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    [url, reqMethod, token]
  );

  return { data, loading, error, fetchData };
};

export default useFetch;
