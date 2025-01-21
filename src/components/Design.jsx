import title from "../assets/images/text.png"
import down from "../assets/images/down.svg"
import DesignStyle from "../styles/DesignStyle"
import { Navigate, useNavigate } from "react-router"
function Design() {

    const navigate = useNavigate()

    const handleClick = ()=>{
        navigate("/about")
    }
  return (

    <>
    <DesignStyle>
     <div className="firstdiv">
        <img  className="homePageTitle" src={title}/>
        <div className="designText">
        <h1 id="firstText">Chicago | Cleveland</h1>
        <h1 id="secondText">Embark history</h1>
        </div>
    
        <button className="designButton">
    <a href="https://extravaganzart.netlify.app/museums" className="designButtonA"><span>Explore the museums</span></a> 
    </button>
    <img onClick={()=>{handleClick()}} className="arrowDown" src={down} />
            </div>
            </DesignStyle>
    </>
  )
}

export default Design