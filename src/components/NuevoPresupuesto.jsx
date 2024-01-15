import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValidPresupuesto}) => {

    const [menjase, setMenjase] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!presupuesto || presupuesto <= 0){
            setIsValidPresupuesto(false)
            setMenjase('No es un presupuesto valido');
            return
        }else{
            setIsValidPresupuesto(true)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">

            <form onSubmit={handleSubmit} className="formulario" >

                <div className="campo">

                    <label>Definir Presupuesto</label>
                    <input 
                    type="number"
                    className="nuevo-presupuesto" 
                    placeholder="0"
                    onChange={e => setPresupuesto(Number(e.target.value))}/>

                </div>

                <input type="submit" value="Añadir"/>

                {menjase && <Mensaje tipo="error" >{menjase}</Mensaje>}

            </form>
        </div>
    )
}

export default NuevoPresupuesto