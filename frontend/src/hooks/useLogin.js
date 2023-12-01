import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const user = await response.json();
        sessionStorage.setItem("user", JSON.stringify(user));
        console.log("User logged in successfully!");

        navigate("/");
      } else {
        console.error("Login failed");
        setIsLoading(false);
        setError("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error during login", error);
      setIsLoading(false);
    }
  };
  return {
    handleLogin,
    error,
    isLoading,
  };
};
