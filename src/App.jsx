import { useState, useEffect } from 'react'

import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import Filtro from './components/Filtro'

import { generarId } from './helpers'

import IconoNuevoGasto from "./img/nuevo-gasto.svg"

function App() {

  const [presupuesto, setPresupuesto] = useState([
    Number(localStorage.getItem('presupuesto')) ?? 0
  ])
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  
  
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }
  
  const guardarGasto = (nuevoGasto) => {
    if (nuevoGasto.id) {
      setGastosFiltrados((prev) =>
        prev.map((gastoFiltrado) =>
          gastoFiltrado.id === nuevoGasto.id ? nuevoGasto : gastoFiltrado
        )
      );
      setGastos((prev) =>
        prev.map((gasto) => (gasto.id === nuevoGasto.id ? nuevoGasto : gasto))
      );
      setGastoEditar({});
    } else {
      nuevoGasto.id = generarId();
      nuevoGasto.fecha = new Date().getTime();
      setGastos([...gastos, nuevoGasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };
  
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  useEffect(() => {
    const presupuestoLocalStorage = Number(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLocalStorage > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('presupuesto',presupuesto ?? 0)
  }, [presupuesto])
  
  useEffect(() => {
    localStorage.setItem('gastos',JSON.stringify(gastos)) ?? []
  }, [gastos])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos} 
        presupuesto={presupuesto} 
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto} 
        setIsValidPresupuesto={setIsValidPresupuesto}/>

        {isValidPresupuesto && 
        (
          <>
            <main>
              <Filtro filtro={filtro} setFiltro={setFiltro}/>
              <ListadoGastos 
                gastos={gastos} 
                setGastoEditar={setGastoEditar} 
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}/>
            </main>
            <div className="nuevo-gasto">
              <img src={IconoNuevoGasto} alt="Icono nuevog asto" onClick={handleNuevoGasto}/>
            </div>
          </>
        )}
        {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} gastoEditar={gastoEditar} setGastoEditar={setGastoEditar}/>}
    </div>
  )
}

export default App
