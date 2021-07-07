import React,{useEffect, useState} from 'react'
import ContensAdmind from "../adminComponents/ContensAdmind"
import {auth} from "../firebase"
import {withRouter} from "react-router-dom"

const Admin = (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if(auth.currentUser){
            // console.log("Existe Usuario");
            setUser(auth.currentUser)
        }else{
            console.log("No Existe Usuario");
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div>
            {user ? (
                <ContensAdmind user={user}/>
            ):(
                <h3>Error Consulte con el informatico.</h3>
            )}
        </div>
    )
}

export default  withRouter(Admin)
