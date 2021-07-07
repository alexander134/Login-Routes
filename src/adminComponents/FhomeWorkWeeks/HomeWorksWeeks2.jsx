import React, { useState } from 'react'
import Listado from './Components/Listado'
import Formulario from './Components/Formulario'

function HomeWorksWeeks2(props) {
    const {user}=props
    const [tareas, setTareas] = useState([])
    const [modoEdicion, serModoEdicion] = useState(false)
    const [idTarea, setIdTarea] = useState("")
    const [tarea, setTarea] = useState("")
    const [descripcionTarea, setDescripcionTarea] = useState("")
    return (
        <div className="container mt-3">
            <div className="row">
                <Listado 
                    user={user}
                    tareas={tareas}
                    setTareas={setTareas}
                    serModoEdicion={serModoEdicion}
                    setIdTarea={setIdTarea}
                    setTarea={setTarea}
                    setDescripcionTarea={setDescripcionTarea} /> 
                <Formulario 
                    user={user}
                    tareas={tareas}
                    setTareas={setTareas}
                    modoEdicion={modoEdicion}
                    serModoEdicion={serModoEdicion}
                    setIdTarea={setIdTarea}
                    idTarea={idTarea}
                    tarea={tarea}
                    setTarea={setTarea}
                    descripcionTarea={descripcionTarea}
                    setDescripcionTarea={setDescripcionTarea} />
            </div>
        </div>
    )
}

export default HomeWorksWeeks2;
