import React, { useState, useEffect } from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import Login from './Components/Login/Login'
import Bookings from './Components/Bookings/Bookings'

const App = () => {

  const [admin, setAdminData] = useState({})
  const [logged, setLogged] = React.useState(false);

  useEffect(async () => {

    var data = JSON.parse(localStorage.getItem('admin'))

    if (data !== null) {
      setAdminData(data)
      setLogged(true)
    }

  }, [])


  const adminData = (data) => {
    setAdminData(data)
    localStorage.setItem('admin', JSON.stringify(data))
    setLogged(true)
  }

  return (
    <div>
      <Router>

        <Header />

        <Switch>
          <Route path="/bookings">
            <Bookings logged={logged} adminData={admin} />
          </Route>
          <Route path="/">
            <Login getAdminData={adminData} />
          </Route>
        </Switch>


      </Router>
      <Footer />
    </div>
  )
}


export default App