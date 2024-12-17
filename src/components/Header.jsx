import HeaderStyle from "../styles/HeaderStyle";
import { Link, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import Search from "./Search";
import logo2 from "../assets/images/logo2.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

 const handleClickOutside = (event) => {
  if (menuOpen && !navRef.current.contains(event.target)) {
    if (event.target.closest(".hamburger")) {
      return
    }
    closeMenu()
  }
}
  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuOpen])

  const determineTarget = () => {
    if (location.pathname.startsWith("/chicago-institute-of-art")) {
      return "chicago"
    }
    if (location.pathname.startsWith("/cleveland-art-museum")) {
      return "cleveland"
    }
    return null
  }

  const target = determineTarget()

  return (
    <HeaderStyle>
      <header className="header">
        <div className="logocont">
          <img src={logo2} className="logo" />
          <div className="title">
            <h1>Extravaganza</h1>
            <p>Art Curator</p>
          </div>
        </div>
        {target && <Search target={target} />}

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
        <nav
          className={`nav ${menuOpen ? "open" : ""}`}
          ref={navRef}
        >
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/gallery" className="nav-link" onClick={closeMenu}>
            My Gallery
          </Link>
          <a href="#" className="nav-link" onClick={closeMenu}>
            Login
          </a>
        </nav>
      </header>
    </HeaderStyle>
  )
}

export default Header
