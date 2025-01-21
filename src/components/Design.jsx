import title from "../assets/images/text.png"
import down from "../assets/images/down.svg"
import DesignStyle from "../styles/DesignStyle"
import { Navigate, useNavigate } from "react-router"
import { HashLink } from "react-router-hash-link"

function Design() {

    const navigate = useNavigate()

    const handleClick = ()=>{
       navigate("/museums")
    }
  return (

    <>
    <DesignStyle>
     <div className="firstdiv">
        <img  className="homePageTitle" src={title}/>
        <div className="designText">
        <h1 id="firstText">Chicago | Cleveland</h1>
        <h1 id="secondText">A Gateway to Art, History, and Heritage</h1>
        </div>
    
        <button className="designButton">
    <a onClick={()=>{handleClick()}} className="designButtonA"><span>Explore the museums</span></a> 
    </button>
    <HashLink to="#aboutSection"  scroll={(el) => el.scrollIntoView({ behavior: "smooth", block: "start" })}>
    <img  className="arrowDown" src={down} />
    </HashLink >
            </div>
        
            </DesignStyle>
    </>
  )
}

export default Design