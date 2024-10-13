import React, { useState } from "react";
import "../hojas-de-estilo/barra-busqueda.css";

function BarraBusqueda({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase(); // Convertir a minúsculas
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <input
      className="buscador"
      type="text"
      placeholder="Buscar personaje..."
      value={searchTerm}
      onChange={handleSearchChange} //
    />
  );
}

export default BarraBusqueda;

