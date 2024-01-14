export const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}

export const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}

export const formatearFecha = fecha => {
    const nuevaFecha = new Date()
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return nuevaFecha.toLocaleDateString('es-ES',opciones)
}

export const revertirArray = array => array.slice().reverse()
