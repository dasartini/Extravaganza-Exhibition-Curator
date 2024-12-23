
import HeaderStyle from "../styles/HeaderStyle";
import { Link, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import Search from "./Search";
import extravaganza from "../assets/images/extravaganza.png";
import { useSlideShowContext } from "../context/SlideShowContext";


function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const {isSlideShowOpen, setIsSlideShowOpen} = useSlideShowContext()
  const location = useLocation()
  const navRef = useRef(null)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const handleKeyDown = (event) => {
    if (menuOpen && event.key === "Escape") {
      closeMenu();
    }
  }

  const trapFocus = (event) => {
    if (menuOpen && navRef.current) {
      const focusableElements = navRef.current.querySelectorAll(
        "a, button, [tabindex]:not([tabindex='-1'])"
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }
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
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("keydown", trapFocus)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keydown", trapFocus)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keydown", trapFocus)
    };
  }, [menuOpen])

  const determineTarget = () => {
    if (location.pathname.startsWith("/museums/chicago-institute-of-art")) {
      return "chicago"
    }
    if (location.pathname.startsWith("/museums/cleveland-art-museum")) {
      return "cleveland"
    }
    return null
  }

  const target = determineTarget()

  return (
    <HeaderStyle>
      <header className="header">
        <img
          className="extravaganza"
          src={extravaganza}
          alt="Art Extravaganza Logo"
        />
        {target && <Search target={target} />}

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          disabled={isSlideShowOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {menuOpen && (
          <div
            className="overlay"
            onClick={closeMenu}
            aria-hidden="true"
            role="presentation"
          ></div>
        )}

        <nav
          className={`nav ${menuOpen ? "open" : ""}`}
          ref={navRef}
          aria-hidden={!menuOpen}
          aria-label="Main navigation"
        >
          <Link
            to="/home"
            className="nav-link"
            onClick={closeMenu}
            aria-label="Go to Home page"
          >
            Home
          </Link>
          <Link
            to="/museums"
            className="nav-link"
            onClick={closeMenu}
            aria-label="Go to All Museums"
          >
            Museums
          </Link>
          <Link
            to="/gallery"
            className="nav-link"
            onClick={closeMenu}
            aria-label="Go to My Gallery"
          >
            My Gallery
          </Link>
          {/* <a
            href="#"
            className="nav-link"
            onClick={closeMenu}
            aria-label="Login to your account"
          >
            Login
          </a> */}
        </nav>
      </header>
    </HeaderStyle>
  )
}

export default Header
