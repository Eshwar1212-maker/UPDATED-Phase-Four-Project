import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { BuyTracks } from "./pages/BuyTracks";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUser } from "./context/AuthContext";
import { SellTracks } from "./pages/SellTRacks";

function App() {
  const { user } = useUser();
  return (
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          {user.token && <Route path="/selltracks" element={<SellTracks />} />}
          {user.token && <Route path="/buytracks" element={<BuyTracks />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
