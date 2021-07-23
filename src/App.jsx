import React, { useState,useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from "./components/Home"
import Login from "./components/Login"
import Perfil from "./components/Perfil"
import Admin from "./components/Admin"
import Reset from "./components/Reset"
import ReduxCompanent from "./components/Redux"
import {auth} from "./firebase"

function App() {
  const [firebase, setFirebase] = useState(false)
  useEffect(() => {
    const fetchUser=()=>{
      auth.onAuthStateChanged(user=>{
        // console.log(user)
        if(user){
          setFirebase(user)
        }else{
          setFirebase(null)
        }
      })
    }
    fetchUser()
}, [])

  const RutaPrivada =({component,path,...rest})=>{
    if(localStorage.getItem('usuario') || localStorage.getItem('usuario2')){
      let usuarioStorage=""
      if(localStorage.getItem('usuario2')){
        usuarioStorage=localStorage.getItem('usuario2')
      }else{
        usuarioStorage=JSON.parse(localStorage.getItem('usuario'))
        usuarioStorage=usuarioStorage.uid
      }
      if(usuarioStorage === firebase.uid){
       return <Route component={component} path={path} {...rest}/>
      }else{
        return <Redirect to="/login" {...rest}/>
      }
    }else{
      return <Redirect to="/login" {...rest}/>
    }
  }

  return firebase!== false ?(
    <Router>
      <div className="constainer">
        <Navbar firebase={firebase}/>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/reset">
            <Reset/>
          </Route>
          <RutaPrivada component={Admin} path="/admin"/>
          <RutaPrivada component={Perfil} path="/perfil"/>
          <RutaPrivada component={ReduxCompanent} path="/redux"/>
        </Switch>
      </div>
    </Router>
  ):<p>Loading ...</p>;
}

export default App;
