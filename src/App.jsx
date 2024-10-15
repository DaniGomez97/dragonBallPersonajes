import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import fondo from "../public/fondo.jpg";
import BotonMostrarApi from "./Componentes/BotonMostrarApi";
import MostrarPersonaje from "./Componentes/MostrarPersonaje";

function App() {
  return (
    <Router>
      <div className="contenedor-title">
        <p>
          Wiki Dragon<span>Ball</span>
        </p>
      </div>

      <img src={fondo} alt="logo" className="fondo" />
      <Routes>
        <Route path="/" element={<BotonMostrarApi />} />
        <Route path="/personaje/:id" element={<MostrarPersonaje />} />
      </Routes>
    </Router>
  );
}

export default App;
