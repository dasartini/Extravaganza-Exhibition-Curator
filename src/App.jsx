import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homebox from './components/Homebox'
import Other from './components/Other'
import Header from './components/Header'
import Landing from './components/Landing'
import Footer from './components/Footer'

function App() {

  return (
    <div className='wrapper' >
    <Header/>
    <Landing/>
    <Footer/>
    </div>
  )
}

export default App
