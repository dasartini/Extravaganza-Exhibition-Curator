import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homebox from './components/Homebox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Homebox/>
       
    </>
  )
}

export default App
