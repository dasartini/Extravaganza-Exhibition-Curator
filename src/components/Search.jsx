import { useVisibleContext } from "../context/VisibleContext";
import { useSearchContext } from "../context/SearchContext";
import { useState } from "react";

function Search({target}) {
  const { visible } = useVisibleContext();
  const { setQuery, setChicagoQuery } = useSearchContext()
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  }

  const handleSearch = () => {
    if (target === "cleveland"){ setQuery(inputValue)}
   else if (target === "chicago"){ setChicagoQuery(inputValue)}
  }

  return (
    <div hidden={visible} className="searchbarCont">
      <input
        type="text"
        className="search-bar"
        value={inputValue} 
        onChange={handleInputChange} 
        placeholder="Search artworks"
      />
      <button className="go"onClick={handleSearch}>GO!</button>
    </div>
  )
}

export default Search
