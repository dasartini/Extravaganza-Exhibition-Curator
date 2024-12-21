import { useEffect } from "react";
import { useNavigate } from "react-router";
import goback from "../assets/images/back4.svg";
import GoBackStyle from "../styles/GoBackStyle";

function GoBackButton() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.key.toLowerCase() === "b") {
        handleGoBack()
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [])

  return (
    <GoBackStyle>
      <button
        onClick={handleGoBack}
        className="goback-button"
        aria-label="Go back to the previous page"
      >
        <img className="goback-button" src={goback} alt="Go back icon" />
      </button>
    </GoBackStyle>
  );
}

export default GoBackButton