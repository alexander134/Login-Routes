import React, { useEffect,useState } from 'react'
import { db } from '../../../firebase'

import moment from 'moment'
import 'moment/locale/es'

function Listado(props) {
    const {user, tareas, setTareas, serModoEdicion, setIdTarea, setTarea, setDescripcionTarea } = props;

    const [ultimo, setUltimo] = useState(null)
    const [desactivar, setDesactivar] = useState(false)

    useEffect(() => {
        const obtnerTareas = async () => {
            try {
                setDesactivar(true)
                // const db = firebase.firestore()
                const data = await db.collection(user.uid)
                .limit(4)
                .orderBy('name','desc')
                .get()
                setUltimo(data.docs[data.docs.length - 1])
                const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setTareas(arrayData)

                const query = await db.collection(user.uid)
                .limit(4)
                .orderBy('name','desc')
                .startAfter(data.docs[data.docs.length - 1])
                .get()

                if(query.empty){
                    setDesactivar(true)
                }else{
                    setDesactivar(false)
                }

            } catch (error) {
                console.log("error al ir al firestore");
            }
        }
        
        obtnerTareas();
    }, [setTareas,user.uid])

    const siguente= async()=>{
        try {
            const data = await db.collection(user.uid)
                .limit(4)
                .orderBy('name','desc')
                .startAfter(ultimo)
                .get()
                const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setTareas([
                    ...tareas,
                    ...arrayData
                ])
                setUltimo(data.docs[data.docs.length - 1])


                const query = await db.collection(user.uid)
                .limit(4)
                .orderBy('name','desc')
                .startAfter(data.docs[data.docs.length - 1])
                .get()

                if(query.empty){
                    setDesactivar(true)
                }else{
                    setDesactivar(false)
                }
        } catch (error) {
            
        }
    }
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
                            {item.name}  {moment(item.fecha).format('LLL')}
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
            <button onClick={()=>siguente()}
             className="btn btn-info btn-block mt-2 btn-sm" disabled={desactivar}>Siguente...</button>
        </div>
    )
}

export default Listado;
