import { useState, useContext } from "react"
import { SearchContext } from "../context/SearchContext"

function Search(){
    const { search, setSearch } = useContext(SearchContext)
    const [searchbar ,setSearchbar] = useState("Chicago")


    return (<>
      <div className="searchbarCont">
          {searchbar === "Chicago"? <input type="text" className="search-bar" placeholder="Search Chicago" /> : 
          <input type="text" className="search-bar" placeholder="Search Cleveland" />}
          <button>GO!</button>
        <div className="searchBarButtons">
        <span onClick={()=>{setSearchbar("Chicago")}}>Chicago</span> | <span onClick={()=>{setSearchbar("Cleveland")}}> Cleveland</span></div>
        </div>

    </>)
}

export default Search