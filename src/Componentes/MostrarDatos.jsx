import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import traerDatos from "../funciones/traerDatos";
import "../hojas-de-estilo/mostrar-datos.css";

function MostrarDatos() {
  const [data, setData] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(6);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    traerDatos("https://dragonball-api.com/api/characters?limit=58", setData);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Convertir a minúsculas
  };

  useEffect(() => {
    if (data && data.items) {
      const filteredItems = data.items.filter(
        (item) => item.name.toLowerCase().includes(searchTerm) // Filtra por nombre
      );
      setVisibleItems(filteredItems.slice(0, itemsToShow)); // Actualiza los elementos visibles
    }
  }, [data, itemsToShow, searchTerm]); // Agrega searchTerm como dependencia

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      // Verificamos si estamos a 100px o menos del final de la página
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
        <input
          className="buscador"
          type="text"
          placeholder="Buscar personaje..."
          value={searchTerm}
          onChange={handleSearchChange} //
        />
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
