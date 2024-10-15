import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importa useParams
import traerDatos from "../funciones/traerDatos";
import "../hojas-de-estilo/mostrar-personaje.css";

function MostrarPersonaje() {
  const { id } = useParams(); // Obtiene el ID de la URL
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      // Verifica que haya un ID antes de hacer la llamada
      traerDatos(`https://dragonball-api.com/api/characters/${id}`, setData);
    }
  }, [id]);

  return (
    <div>
      {data ? (
        <div>
          <h1 className="titulo-principal">{data.name}</h1>
          <p className="parrafo">
            Ki: {data.ki} - Raza: {data.race}
          </p>
          <img className="imagen-personaje" src={data.image} alt={data.name} />
          <p className="parrafo">{data.description}</p>

          <h2 className="titulo-secundario">
            Planeta de origen: {data.originPlanet.name}
          </h2>
          <img
            className="imagen-planeta"
            src={data.originPlanet.image}
            alt={data.originPlanet.name}
          />
          <p className="parrafo">{data.originPlanet.description}</p>

          {data.transformations.length > 0 ? (
            <div>
              <div className="transformaciones-contenedor">
                <h2 className="titulo-transformacion">Transformaciones:</h2>
                <div className="grid-transformaciones">
                  {data.transformations.map((transformation) => (
                    <div
                      key={transformation.id}
                      className="transformacion-item"
                    >
                      <h2 className="titulo-transformacion-personaje">
                        {transformation.name}
                      </h2>
                      <div className="contenedor-img-transformaciones">
                        <img
                          className="imagen-transformacion"
                          src={transformation.image}
                          alt={transformation.name}
                        />
                      </div>
                      <p className="ki-Class">Ki: {transformation.ki}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <h2>Este personaje no tiene transformaciones</h2>
          )}
        </div>
      ) : (
        "Cargando datos..."
      )}
    </div>
  );
}

export default MostrarPersonaje;
