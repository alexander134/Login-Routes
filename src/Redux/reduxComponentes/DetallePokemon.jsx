import React,{ useEffect }  from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {ApiObtenerDetallePoke} from '../pokeDucks'


const DetallePokemon = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData=()=>{
            dispatch(ApiObtenerDetallePoke())
        }
        fetchData()
    }, [dispatch])

    const pokemon =useSelector(store=> store.pokemones.unPokemon)
    // console.log(pokemon);
    return pokemon ?(
        <div className="card mt-4 text-center"  >
            <div className="card-body">
                <img src={pokemon.foto} alt="" className="img-fluid" />
                <div className="card-title text-uppercase">{pokemon.nombre}</div>
                <p className="card-text">Alto: {pokemon.alto} | Ancho: {pokemon.ancho}</p>
            </div>
        </div>
    ):null
}

export default DetallePokemon
