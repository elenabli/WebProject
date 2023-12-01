import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth";

const Navbar = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const email = user ? user.email : null;

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Dashboard</h1>
        </Link>
        <nav>
          {isLogged && (
            <div>
              <span>{email}</span>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
          {!isLogged && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
