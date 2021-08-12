import React,{useState}  from 'react'
import {ThemeContext} from '../../context/ThemeProvider'

const PruebaContext = () => {

    const {theme,setThemes}= React.useContext(ThemeContext)

    return (
        <div>
            componenta para probar otra forma de llamar a las props

            
            <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="input-group mb-3" style={{background:theme.background,color:theme.color}}>
                                <h1>Personaliza tu mensaje</h1>
                                <label htmlFor="favcolortext">txto:</label>
                                <input type="color" onChange={(e)=>setThemes({...theme,color:e.target.value})} id="favcolortext" value="#ff0000" />

                                <label htmlFor="favcolorfondo">fondo:</label>
                                <input type="color"  onChange={(e)=>setThemes({...theme,background:e.target.value})}  id="favcolorfondo" value="#ff0000" />
                            </div>
                        </div>
                    </div>
                </div>
                
        </div>
    )
}

export default PruebaContext
