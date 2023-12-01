import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useLogin = (email, password) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
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
    }
}