import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams
import traerDatos from '../funciones/traerDatos';
import '../hojas-de-estilo/mostrar-personaje.css'

function MostrarPersonaje() {
  const { id } = useParams(); // Obtiene el ID de la URL
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) { // Verifica que haya un ID antes de hacer la llamada
      traerDatos(`https://dragonball-api.com/api/characters/${id}`, setData);
    }
  }, [id]);

  return (
    <div>
      {data ? (
        <div>
          <h1 className='titulo-principal'>{data.name}</h1>
          <p className='parrafo'>Ki: {data.ki} - Raza: {data.race}</p>
          <img src={data.image} alt={data.name} style={{ height: 'auto', width: '20%' }} />
          <p className='parrafo'>{data.description}</p>
          
          <h2 className='titulo-secundario'>Planeta de origen: {data.originPlanet.name}</h2>
          <img src={data.originPlanet.image} alt={data.originPlanet.name} style={{ height: 'auto', width: '60%' }} />
          <p className='parrafo'>{data.originPlanet.description}</p><br></br>
          

  
          {data.transformations.length > 0 ? (
            <div>
              <h2 className='titulo-secundario' style={{color:'red'}}>Transformaciones:</h2> 
            <div className="transformaciones-contenedor">
              {data.transformations.map(transformation => (
                <div key={transformation.id} className="transformacion-item">
                  <h2 className='titulo-secundario'>{transformation.name}</h2>
                  <div className="contenedor-img-transformaciones">
                    <img className='imagen-transformacion'
                      src={transformation.image} 
                      alt={transformation.name} 
                      style={{ height: 'auto', width: '15%' }} 
                    />
                  </div>
                  <br></br><p className='parrafo'>Ki: {transformation.ki}</p>
                </div>
              ))}
            </div>
            </div>
          ) : (
            <h2>Este personaje no tiene transformaciones</h2>
          )}
        </div>
      ) : (
        'Cargando datos...' // Mensaje de carga mientras los datos son obtenidos
      )}
    </div>
  );
}

export default MostrarPersonaje;
