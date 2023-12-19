import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import Photos from './components/Photos';
import { Route, Routes } from 'react-router-dom';
import SinglePhoto from './components/SinglePhoto';

const App = () => {
  return(
    <>
    <Routes>
      <Route path='/' element={<Photos />}/>
      <Route path='/photo/:id' element={<SinglePhoto />}/>
    </Routes>
    </>
  )
}

export default App
