import { useState } from 'react'

import './App.css'
import Users from './Pages/Users';
import { Routes, Route } from 'react-router-dom';
import User from './Pages/UserTask';

function App() {

  return (
    <>
      <div>
       
        <Routes>
        <Route path='' element={<Users />} />
        <Route path=':id' element={<User />} />
      </Routes>
        
      </div>
    
    </>
  )
}

export default App
