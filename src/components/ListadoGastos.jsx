import Gasto from "./Gasto"
import {revertirArray} from "../helpers/index"

const ListadoGastos = ({
    gastos, 
    setGastoEditar, 
    eliminarGasto, 
    filtro, 
    gastosFiltrados
}) => {

    

    return (
        <div className="listado-gastos contenedor">
            {filtro ? (
                <>
                    <h2>{gastosFiltrados.length ? 'Gastos' : 'Aún no hay gastos'}</h2>
                    {revertirArray(gastosFiltrados).map( gasto => {
                        return <Gasto key={gasto.id} gasto={gasto} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}/>
                    })}
                
                </>
            ) : (
                <>
                    <h2>{gastos.length ? 'Gastos' : 'Aún no hay gastos'}</h2>
                    {revertirArray(gastos).map( gasto => {
                        return <Gasto key={gasto.id} gasto={gasto} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}/>
                    })}
                </>
            )}
            
        </div>
    )
}

export default ListadoGastos