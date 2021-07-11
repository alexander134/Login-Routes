import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {ApiObtenerPokeAccion,ApiSiguenteObtenerPokeAccion} from '../pokeDucks'
// import {ApiObtenerPokeAccion} from '../pokeDucks'

const Pokemones = () => {

    const dispatch= useDispatch()
    const pokemonesDatos= useSelector(store=>store.pokemones.array)
    console.log(pokemonesDatos);
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 text-center">
                    <h2>lista de pokemones</h2>
                    <button className="btn btn-dark btn-block" onClick={()=>dispatch(ApiObtenerPokeAccion())} >obtener pokemones</button>
                    <button className="btn btn-success btn-block" onClick={()=>dispatch(ApiSiguenteObtenerPokeAccion(20))} >siguentes pokemones</button>
                
                </div>
                <div className="col-md-6">
                    <ul className="list-group">
                    {
                        pokemonesDatos.map(item => (
                            <li className="list-group-item" key={item.name}>
                                {item.name}
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Pokemones
