import React, { useState,useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from "./components/Home"
import Login from "./components/Login"
import Admin from "./components/Admin"
import Reset from "./components/Reset"
import Redux from "./components/Redux"
import {auth} from "./firebase"

function App() {
  const [firebase, setFirebase] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged(user=>{
      // console.log(user)
      if(user){
        setFirebase(user)
      }else{
        setFirebase(null)
      }
    })
    
}, [])

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
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/redux">
            <Redux/>
          </Route>
        </Switch>
      </div>
    </Router>
  ):<p>Loafing ...</p>;
}

export default App;
