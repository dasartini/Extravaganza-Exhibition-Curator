import LoaderStyle from "../styles/LoaderStyle"
function Loader(){
return(
    <LoaderStyle>
        <div className="loader-container">
    <div className="loader"></div>
    <p aria-live="polite">Loading...</p>
    </div>
    </LoaderStyle>
)

}

export default Loader