import React, { useState } from 'react'
// import { firebase } from '../firebase'
import {db } from '../../../firebase'

function Formulario(props) {
    const {user,tareas, setTareas, modoEdicion, serModoEdicion, setIdTarea, idTarea, tarea, setTarea, descripcionTarea, setDescripcionTarea } = props;

    const [validaInputAgregar, setFalidaInputAgregar] = useState(false)
    const [validaInputAgregarDes, setFalidaInputAgregarDes] = useState(false)

    const agregarTarea = async (e) => {
        e.preventDefault()

        if (!tarea.trim()) {
            setFalidaInputAgregar(true)
            return
        }
        setFalidaInputAgregar(false)
        if (!descripcionTarea.trim()) {
            setFalidaInputAgregarDes(true)
            return
        }
        setFalidaInputAgregarDes(false)
        try {
            // const db = firebase.firestore()
            const nuevaTarea = {
                name: tarea,
                fecha: Date.now(),
                descripcion: descripcionTarea
            }
            const data = await db.collection(user.uid).add(nuevaTarea)
            setTareas([
                ...tareas,
                { ...nuevaTarea, id: data.id }
            ])
            setTarea('')
            setDescripcionTarea('')
        } catch (error) {
            console.log(error);
        }
    }


    const editarTarea = async (e) => {
        e.preventDefault()
        if (!tarea.trim()) {
            setFalidaInputAgregar(true)
            return
        }
        setFalidaInputAgregar(false)
        if (!descripcionTarea.trim()) {
            setFalidaInputAgregarDes(true)
            return
        }
        setFalidaInputAgregarDes(false)
        try {
            // const db = firebase.firestore()
            await db.collection(user.uid).doc(idTarea).update({
                name: tarea,
                descripcion: descripcionTarea
            })
            const arraEditado = tareas.map(item => (
                item.id === idTarea ? { id: item.id, fecha: item.fecha, descripcion: descripcionTarea, name: tarea } : item
            ))
            setTareas(arraEditado)
            serModoEdicion(false)
            setTarea('')
            setDescripcionTarea('')
            setIdTarea('')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="col-md-6">
            <h3 className={modoEdicion ? "text-warning text-center" : "text-primary text-center"}>
                {
                    modoEdicion ? "Editar Tarea" : "Agregar Tarea"
                }
            </h3>
            <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
                {validaInputAgregar && (
                    <div className="alert alert-warning" role="alert">debe ingresar una tarea</div>
                )}
                <input type="text" placeholder="Ingrese Tarea" className="form-control mb-2" onChange={e => setTarea(e.target.value)} value={tarea} />
                {validaInputAgregarDes && (
                    <div className="alert alert-warning" role="alert">debe ingresar la descrición de la tarea</div>
                )}
                <textarea className="form-control  mb-2" rows="3" placeholder="Ingrese la descripción de la tarea" onChange={e => setDescripcionTarea(e.target.value)} value={descripcionTarea}></textarea>
                <button className={modoEdicion ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} type="submit">{modoEdicion ? "Editar" : "Agregar"}</button>
            </form>
        </div>
    )
}

export default Formulario;