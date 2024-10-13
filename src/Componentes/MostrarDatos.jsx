import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";  
import traerDatos from "../funciones/traerDatos";
import "../hojas-de-estilo/mostrar-datos.css";
import BarraBusqueda from "./BarraBusqueda";

function MostrarDatos() {
  const [data, setData] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    traerDatos("https://dragonball-api.com/api/characters?limit=58", setData);
  }, []);

  const handleSearchChange = (searchTerm) => {
    if (data && data.items) {
      const filteredItems = data.items.filter(
        (item) => item.name.toLowerCase().includes(searchTerm) 
// se filtran los elementos de data.items comparando si el nombre del personaje incluye el término de búsqueda en minúsculas (searchTerm).
      );
      setVisibleItems(filteredItems.slice(0, itemsToShow)); // Actualiza los elementos visibles
    }
  };

  useEffect(() => {
    if (data) {
      setVisibleItems(data.items.slice(0, itemsToShow)); // Inicialmente muestra los elementos
    }
  }, [data, itemsToShow]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setItemsToShow((prev) => Math.min(prev + 6, data.items.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  const handleClick = (id) => {
    navigate(`/personaje/${id}`);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="contenedor-buscador">
        <BarraBusqueda onSearchChange={handleSearchChange} /> {/* Pasa la función de búsqueda */}
      </div>

      <div className="contenedor">
        {data ? (
          <>
            {visibleItems.map((item, index) => (
              <motion.div
                className="contenedor-images"
                key={item.id}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ duration: 1, delay: index * 0.05 }}
                onClick={() => handleClick(item.id)}
              >
                <h1 className="titulo-personaje">{item.name}</h1>
                <img className="imagen" src={item.image} alt={item.name} />
              </motion.div>
            ))}
          </>
        ) : (
          "Cargando datos..."
        )}
      </div>
    </>
  );
}

export default MostrarDatos;
