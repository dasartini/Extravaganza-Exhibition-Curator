import SavedStyle from "../styles/SavedStyle"
import error from "../assets/images/404.jpg"
import { Link } from "react-router"
function ErrPage (){

    return(<>
        <SavedStyle>
        <Link to={"/"}>
        <h1>Oops!</h1>
        <h1>Seems like this page does not exist.</h1>
        <p>Click to go back</p>
        <br></br>
        <img src={error} style={{borderRadius: "5%", height:"30rem", marginBottom:"1.5rem"}}/>
        </Link>
        </SavedStyle>
        </>
    )
}

export default ErrPage