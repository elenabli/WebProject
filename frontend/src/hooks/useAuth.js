import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";


const useAuth = () => {
  const [user, setUser] = useState(null);
//   const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    // navigate("/login");
  };

  return { user, logout };
};

export default useAuth;
