import { useState, useEffect } from "react"

import Mensaje from "./Mensaje"

import CerrarBtn from "../img/cerrar.svg"

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto,
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMenasje] = useState('')

    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')


    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault()
        if([nombre,cantidad,categoria].includes('') || cantidad <= 0){
            setMenasje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMenasje('')
            }, 3000);
            return
        }

        guardarGasto({id,nombre,cantidad,categoria,fecha})
    }

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setId(gastoEditar.id)
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
        }
    }, [])
    

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={CerrarBtn} alt="Cerrar modal" onClick={ocultarModal} />
            </div>

            <form onSubmit={e => handleSubmit(e)} className={`formulario ${animarModal ? 'animar' : 'cerrar' }`} action="">

                <legend> {gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'} </legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        id="nombre" 
                        type="text" 
                        placeholder="Añade el nombre del gasto" 
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}/>
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        id="cantidad" 
                        type="text" 
                        placeholder="Añade la cantidad del gasto: ej. 300" 
                        value={cantidad} 
                        onChange={e => setCantidad(Number(e.target.value))}/>
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria"
                            value={categoria}
                            onChange={e => {setCategoria(e.target.value)}}
                    > 
                        <option value=""> --Seleccione-- </option>
                        <option value="ahorro"> Ahorro </option>
                        <option value="comida"> Comida </option>
                        <option value="casa"> Casa </option>
                        <option value="varios"> Varios </option>
                        <option value="ocio"> Ocio </option>
                        <option value="salud"> Salud </option>
                        <option value="subscribciones"> Subscribciones </option>
                    </select>
                </div>

                <input type="submit" value={gastoEditar.nombre ? 'Guardar cambios': 'Añadir gasto'}/>

            </form>
        </div>
    )
}

export default Modal 