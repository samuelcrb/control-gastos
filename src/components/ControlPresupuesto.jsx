import { useState,useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { formatearCantidad } from "../helpers"


const ControlPresupuesto = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    const handleIniciarMes = () => {
        const resultado = confirm('¿Quieres iniciar un nuevo mes?')
        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    useEffect(() => {
        const totalGastado = gastos.reduce((total,gasto) => total + gasto.cantidad, 0)
        const totalDisponible = presupuesto - totalGastado
        const nuevoPorcentaje = ((presupuesto - totalDisponible) / presupuesto * 100).toFixed(2)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
        setGastado(totalGastado)
        setDisponible(totalDisponible)
    }, [gastos])
    

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar value={porcentaje} text={`${porcentaje}% Gastado`} styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' :'#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? '#DC2626' :'#3B82F6'
                })}/>
            </div>
            <div className="contenido-presupuesto">
                <button 
                    className="reset-app" 
                    type="button" 
                    onClick={handleIniciarMes}>
                        Iniciar mes
                </button>
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto