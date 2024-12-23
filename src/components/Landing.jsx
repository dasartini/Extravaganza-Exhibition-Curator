import LandingStyle from "../styles/LandingStyle";
import chicago from '../assets/images/chicago.jpg';
import { Link } from "react-router";
import { useVisibleContext } from "../context/VisibleContext";
import { useEffect } from "react";
import { useSearchContext } from "../context/SearchContext";
import { usePageContext } from "../context/PageContext";
import { usePaginationContext } from "../context/PaginationContext";
import GoBackButton from "./GoBack";


function Landing(){
  const { num, setNum } = usePaginationContext()

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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])
  useEffect(()=>{ setVisible(true)},[])

    return(<>
      <GoBackButton/>
      <main className="landingContainer">
      <LandingStyle>
        <div className="search-section">
          <h2 className="section-title">Search by museum</h2>
          <div className="museum-cards">

            <Link
              onClick={() => {
                handleResetAndNavigate("chicago");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              to="chicago-institute-of-art"
              aria-label="Navigate to the Art Institute of Chicago collection"
            >
              <div
                className="card"
                role="group"
                aria-labelledby="chicago-card-title"
              >
                <img
                  src={chicago}
                  alt="Art Institute of Chicago museum exterior"
                  className="card-image"
                />
                <h3 className="card-title" id="chicago-card-title">
                  Art Institute of Chicago
                </h3>
              </div>
            </Link>

            <Link
              onClick={() => {
                handleResetAndNavigate("cleveland");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              to="cleveland-art-museum"
              aria-label="Navigate to the Cleveland Museum of Art collection"
            >
              <div
                className="card"
                role="group"
                aria-labelledby="cleveland-card-title"
              >
                <img
                  src="https://i.ytimg.com/vi/yBrPz5aCXdM/maxresdefault.jpg"
                  alt="Cleveland Museum of Art entrance"
                  className="card-image"
                />
                <h3 className="card-title" id="cleveland-card-title">
                  Cleveland Museum Of Art
                </h3>
              </div>
            </Link>

          </div>
        </div>
      </LandingStyle>
    </main>
    </>
    )
}

export default Landing