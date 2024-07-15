import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Admin from './Admin'
import LAdmin from './LAdmin'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/admin/login' element={<LAdmin />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
