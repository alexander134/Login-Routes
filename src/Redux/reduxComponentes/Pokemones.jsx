import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {ApiObtenerPokeAccion,ApiSiguenteObtenerPokeAccion,ApiAnterioresObtenerPokeAccion,ApiObtenerDetallePoke} from '../pokeDucks'
import DetallePokemon from './DetallePokemon'

const Pokemones = () => {

    const dispatch= useDispatch()
    const pokemonesDatos= useSelector(store=>store.pokemones.results)
    const next= useSelector(store=>store.pokemones.next)
    const previous= useSelector(store=>store.pokemones.previous)
    // console.log(pokemonesDatos);


    useEffect(() => {
        const fetchData=()=>{
            dispatch(ApiObtenerPokeAccion())
        }
        fetchData()
    }, [dispatch])
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6">
                    <h2>lista de pokemones</h2>
                    <div className="d-flex justify-content-between">
                    {
                        pokemonesDatos.length ===0 &&
                        <button className="btn btn-dark mr-2" onClick={()=>dispatch(ApiObtenerPokeAccion())} >obtener pokemones</button>
                    }
                     {
                        previous &&
                        <button className="btn btn-success  mr-2" onClick={()=>dispatch(ApiAnterioresObtenerPokeAccion())} >Anteriores pokemones</button>
                    }
                    {
                        next &&
                        <button className="btn btn-success  ml-2" onClick={()=>dispatch(ApiSiguenteObtenerPokeAccion())} >siguentes pokemones</button>
                    }
                   
                    </div>
                    
                    <br />
                
                
                    <ul className="list-group">
                    {
                        pokemonesDatos.map(item => (
                            <li className="list-group-item text-uppercase" key={item.name}>
                                {item.name}
                                <button 
                                onClick={()=>dispatch(ApiObtenerDetallePoke(item.url))}
                                className="btn-dark btn-sm float-right">Info</button>
                            </li>
                        ))
                    }
                    </ul>
                </div>

                
                <div className="col-md-6">
                    <h3>Detalle del Pokemon</h3>
                    <DetallePokemon/>
                </div>
            </div>
        </div>
    )
}

export default Pokemones
