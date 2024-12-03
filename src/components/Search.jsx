import { useVisibleContext } from "../context/VisibleContext"



function Search(){
  const { visible, setVisible } = useVisibleContext()


    return (<>
      <div hidden={visible} className="searchbarCont">
          <input type="text" className="search-bar" placeholder="Search artworks" /> 
          
          <button>GO!</button>
        <div className="searchBarButtons">
        </div>
        </div>

    </>)
}

export default Search