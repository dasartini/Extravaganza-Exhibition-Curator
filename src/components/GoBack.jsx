import { useNavigate } from "react-router";
import goback from "../assets/images/back3.svg"
import GoBackStyle from "../styles/GoBackStyle";
function GoBackButton() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <GoBackStyle>
    <span onClick={handleGoBack} >
      <img className="goback" src={goback}/>
    </span>
    </GoBackStyle>
  )
}


export default GoBackButton
