import LandingStyle from "../styles/LandingStyle";
import chicago from '../assets/images/chicago.jpg';
import { Link } from "react-router";
import { useVisibleContext } from "../context/VisibleContext";
import { useEffect } from "react";



function Landing(){

  const { visible, setVisible } = useVisibleContext()

  useEffect(()=>{ setVisible(true)},[])

    return(
  <main>
<LandingStyle>
        <div className="search-section">
      <h2 className="section-title">Search by museum</h2>
      <div className="museum-cards">

        <Link to="chicagoinstituteofart">
        <div className="card">
          <img src={chicago} alt="Art Institute of Chicago " className="card-image"/>
          <h3 className="card-title">Art Institute of Chicago</h3>
        </div>
        </Link>

        <Link to="clevelandartmuseum">
        <div className="card">
          <img src="https://i.ytimg.com/vi/yBrPz5aCXdM/maxresdefault.jpg" alt="Palazzo Pitti" className="card-image"/>
          <h3 className="card-title">Cleveland Museum Of Art</h3>
        </div>
        </Link>
      </div>
    </div>
    </LandingStyle>
    </main>
    )
}

export default Landing