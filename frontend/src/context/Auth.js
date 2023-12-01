import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;