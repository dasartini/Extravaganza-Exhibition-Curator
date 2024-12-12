import HeaderStyle from "../styles/HeaderStyle";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import Search from "./Search";
import logo2 from "../assets/images/logo2.png"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation() 
 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  };

  const determineTarget = () =>{
    if(location.pathname.startsWith("/chicago-institute-of-art")){
      return "chicago"
    }
    if(location.pathname.startsWith("/cleveland-art-museum")){
      return "cleveland"
    }
    return null
  }

  const target = determineTarget()

  return (
    <HeaderStyle>
      <header className="header">
        <div className="logocont">
      <img src={logo2} className="logo"/>
        <div className="title">
          <h1>Extravaganza</h1>
          <p>Art Curator</p>
          </div>
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
          <Link to="/gallery" className="nav-link">
            My Gallery
          </Link>
          <a href="#" className="nav-link">
            Login
          </a>
        </nav>
      </header>
    </HeaderStyle>
  )
}

export default Header
