import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { BuyTracks } from "./pages/BuyTracks";
import { SellTracks } from "./pages/SellTRacks";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buytracks" element={<ProtectedRoute />} />
          <Route path="/selltracks" element={<ProtectedRoute />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
