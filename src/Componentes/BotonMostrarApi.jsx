import React, {useState} from 'react'
import MostrarDatos from './MostrarDatos'
import '../hojas-de-estilo/boton-mostrar-api.css'

function BotonMostrarApi() {
    const [on, setOn] = useState(false)

  return (
    <div className={on? 'contenedor-desactivado' : 'contenedor-btn'}>
    <button className={on? 'boton-desactivado' : 'boton'} onClick={() => setOn(!on)}>{!on? 'Mostrar personajes' : 'Cerrar'}</button>
    {on && <MostrarDatos/>}
    </div>
  )
}

export default BotonMostrarApi