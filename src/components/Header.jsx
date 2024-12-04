import HeaderStyle from "../styles/HeaderStyle"
import { Link, useLocation } from "react-router"
import { useState } from "react"
import Search from "./Search"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation() 
 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  };

  const determineTarget = () =>{
    if(location.pathname.startsWith("/chicagoinstituteofart")){
      return "chicago"
    }
    if(location.pathname.startsWith("/clevelandartmuseum")){
      return "cleveland"
    }
    return null
  }

  const target = determineTarget()

  return (
    <HeaderStyle>
      <header className="header">
        <div className="logo">
          <h1>Extravaganza</h1>
          <p>Art Curator</p>
        </div>
          {target && <Search target={target}/>}
        
    
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <a href="#" className="nav-link">
            Catalog
          </a>
          <a href="#" className="nav-link">
            Login
          </a>
        </nav>
      </header>
    </HeaderStyle>
  )
}

export default Header
