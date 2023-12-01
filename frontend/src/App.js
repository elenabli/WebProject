import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import useAuth from "./hooks/useAuth";
import { AuthProvider } from "./context/Auth";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Navbar user={user}/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
