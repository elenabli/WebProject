import { useState } from "react";


export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const signup = async (name, email, password) => {
        setIsLoading(true);
        setError(null);
    
        const response = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        const user = await response.json();
        if (!response.ok) {
            setError(user.message);
            setIsLoading(false);
            return;
        }
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
    };
    
    return { signup, error, isLoading };
    }