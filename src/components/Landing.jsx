import LandingStyle from "../styles/LandingStyle";
import chicago from '../assets/images/chicago.jpg';
import { Link } from "react-router";
import { useVisibleContext } from "../context/VisibleContext";
import { useEffect } from "react";
import { useSearchContext } from "../context/SearchContext";
import { usePageContext } from "../context/PageContext";
import { usePaginationContext } from "../context/PaginationContext";


function Landing(){
  const { num, setNum } = usePaginationContext();

  const { visible, setVisible } = useVisibleContext()
  const { setChicagoQuery, setQuery } = useSearchContext()
  const { setCurrentPage } = usePageContext()
  const handleResetAndNavigate = (museum) => {
    
    if (museum === "chicago") {
      setCurrentPage(1)
      setChicagoQuery("")
    }
    if(museum ==="cleveland"){
      setNum(0)
      setQuery("")
    }
  }
  useEffect(()=>{ setVisible(true)},[])

    return(
  <main>
<LandingStyle>
        <div className="search-section">
      <h2 className="section-title">Search by museum</h2>
      <div className="museum-cards">

        <Link onClick={ ()=>{  handleResetAndNavigate("chicago")
           window.scrollTo({ top: 0, behavior: "smooth" })}} to="chicago-institute-of-art">
        <div className="card">
          <img src={chicago} alt="Art Institute of Chicago " className="card-image"/>
          <h3 className="card-title">Art Institute of Chicago</h3>
        </div>
        </Link>

        <Link  onClick={()=>{ handleResetAndNavigate("cleveland") 
          window.scrollTo({ top: 0, behavior: "smooth" })}} to="cleveland-art-museum">
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