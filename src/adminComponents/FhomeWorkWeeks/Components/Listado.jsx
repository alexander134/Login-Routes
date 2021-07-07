import React, { useEffect } from 'react'
import { db } from '../../../firebase'

function Listado(props) {
    const {user, tareas, setTareas, serModoEdicion, setIdTarea, setTarea, setDescripcionTarea } = props;

    useEffect(() => {
        const obtnerTareas = async () => {
            try {
                // const db = firebase.firestore()
                const data = await db.collection(user.uid).get()
                const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setTareas(arrayData)
            } catch (error) {
                console.log("error al ir al firestore");
            }
        }
        obtnerTareas();
    }, [setTareas])


    const eliminarTarea = async (id) => {
        try {
            // const db = firebase.firestore()
            await db.collection(user.uid).doc(id).delete()
            const arrayFiltrado = tareas.filter(item => item.id !== id)
            setTareas(arrayFiltrado)
        } catch (error) {
            console.log(error);
        }
        serModoEdicion(false)
        setTarea('')
        setDescripcionTarea('')
        setIdTarea('')
    }

    const activarEditarTarea = (item) => {
        serModoEdicion(true)
        setIdTarea(item.id)
        setTarea(item.name)
        setDescripcionTarea(item.descripcion)
    }
    return (
        <div className="col-md-6">
            <ul className="list-group">
                {
                    tareas.map(item => (
                        <li className="list-group-item" key={item.id}>
                            {item.name}
                            <button className="btn btn-danger btn-sm float-right" onClick={() => eliminarTarea(item.id)}>
                                Eliminar
                            </button>
                            <button className="btn btn-warning btn-sm float-right mr-2" onClick={() => activarEditarTarea(item)}>
                                Editar
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Listado;
