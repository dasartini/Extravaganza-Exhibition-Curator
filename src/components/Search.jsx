import { useVisibleContext } from "../context/VisibleContext";
import { useSearchContext } from "../context/SearchContext";
import { useState } from "react";

function Search({target}) {
  const { visible } = useVisibleContext();
  const { setQuery, setChicagoQuery, query, chicagoQuery } = useSearchContext()
  const [inputValue, setInputValue] = useState("");

    const handleReset = () => {
      setInputValue("")
      if (target === "cleveland"){ setQuery("")}
   else if (target === "chicago"){ setChicagoQuery("")}
    }
  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  }

  const handleSearch = () => {
    if (target === "cleveland"){ setQuery(inputValue)}
   else if (target === "chicago"){ setChicagoQuery(inputValue)}
  }

  return (<>
    {!visible &&     <div className="searchbarCont">
      <label htmlFor="search-bar" className="sr-only">
      </label>
      <input
        type="text"
        id="search-bar"
        className="search-bar"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search artworks"
        aria-label="Search artworks"
      />
      <button
        className="go"
        onClick={handleSearch}
        aria-label={`Search for artworks in ${target === "cleveland" ? "Cleveland Museum" : "Chicago Institute"}`}
      >
        GO!
      </button>
      {(chicagoQuery || query) &&  <button className="go" onClick={handleReset}>Reset</button> }
     
    </div> }
</>
  )
}

export default Search
