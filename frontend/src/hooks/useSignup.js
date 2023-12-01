import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (obj, url) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    const user = await response.json();
    if (!response.ok) {
      setError(user.message);
      setIsLoading(false);
      return;
    }
    sessionStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
    navigate("/");
  };

  return { signup, error, isLoading };
};
