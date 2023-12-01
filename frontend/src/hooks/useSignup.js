import { useState } from "react";


export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const signup = async (obj, url) => {
        setIsLoading(true);
        setError(null);
    
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( obj ),
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