import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import traerDatos from '../funciones/traerDatos';
import '../hojas-de-estilo/mostrar-datos.css';

function MostrarDatos() {
  const [data, setData] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]); // Estado para los elementos visibles
  const [itemsToShow, setItemsToShow] = useState(6); // Cuántos elementos mostrar inicialmente
  const navigate = useNavigate();

  useEffect(() => {
    traerDatos('https://dragonball-api.com/api/characters?limit=58', setData);
  }, []);

  useEffect(() => {
    if (data && data.items) {
      setVisibleItems(data.items.slice(0, itemsToShow)); // Carga inicial de elementos
    }
  }, [data, itemsToShow]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY + window.innerHeight;
      const bottomOfPage = document.documentElement.scrollHeight;

      // Cargar más elementos al llegar al final de la página
      if (currentScrollY >= bottomOfPage) {
        setItemsToShow((prev) => Math.min(prev + 6, data.items.length)); // Aumenta la cantidad de elementos a mostrar
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    <div className='contenedor'>
      {data ? (
        <>
          {visibleItems.map((item, index) => (
            <motion.div
              className='contenedor-images'
              key={item.id}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 1, delay: index * 0.05 }}
              onClick={() => handleClick(item.id)}
            >
              <h1 className='titulo-personaje'>{item.name}</h1>
              <img className='imagen' src={item.image} alt={item.name} />
            </motion.div>
          ))}
        </>
      ) : (
        'Cargando datos...'
      )}
    </div>
  );
}

export default MostrarDatos;
