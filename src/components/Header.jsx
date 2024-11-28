import HeaderStyle from "../styles/HeaderStyle"

function Header(){
    return(
<HeaderStyle>
<header className="header">
    <div className="logo">
      <h1>Extravaganza</h1>
      <p>Art Curator</p>
    </div>
    <nav className="nav">
      <a href="#" className="nav-link">Home</a>
      <a href="#" className="nav-link">Catalog</a>
      <a href="#" className="nav-link">Login</a>
    </nav>
    <input type="text" placeholder="Search..."/>
  </header> 
  </HeaderStyle>
    )
}

export default Header