import HeaderStyle from "../styles/HeaderStyle"
import { Link } from "react-router"
import { useState } from "react"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  };

  return (
    <HeaderStyle>
      <header className="header">
        <div className="logo">
          <h1>Extravaganza</h1>
          <p>Art Curator</p>
        </div>
        <input type="text" className="search-bar" placeholder="Search..." />
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
