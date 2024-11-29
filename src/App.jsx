import { useState } from 'react'
import './App.css'
import Homebox from './components/Homebox'
import Other from './components/Other'
import Header from './components/Header'
import Landing from './components/Landing'
import Footer from './components/Footer'
import AllArtworks from './components/AllArtworks'
import { Routes, Route } from 'react-router'
import AllArtworks2 from './components/AllArtworks2'

function App() {

  return (
    <div className='wrapper' >
    <Header/>
    <Footer/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/chicagoinstituteofart' element={<AllArtworks/>}/>
      <Route path='/clevelandartmuseum' element={<AllArtworks2/>}/>
    
    </Routes>
    </div>
  )
}

export default App
