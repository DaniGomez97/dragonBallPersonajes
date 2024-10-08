import axios from "axios";

const traerDatos = async(url, set) => {
    const llamada = await axios.get(url)
    set(llamada.data)
}

export default traerDatos;
