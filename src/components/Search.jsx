import { useVisibleContext } from "../context/VisibleContext";
import { useSearchContext } from "../context/SearchContext";
import { useState } from "react";

function Search() {
  const { visible } = useVisibleContext();
  const { setQuery } = useSearchContext(); // We only need `setQuery` here
  const [inputValue, setInputValue] = useState(""); // Local state for input

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update local input state
  };

  const handleSearch = () => {
    setQuery(inputValue); // Update global query state when "GO!" is clicked
  };

  return (
    <div hidden={visible} className="searchbarCont">
      <input
        type="text"
        className="search-bar"
        value={inputValue} // Bind to local input state
        onChange={handleInputChange} // Update local state on typing
        placeholder="Search artworks"
      />
      <button onClick={handleSearch}>GO!</button>
    </div>
  );
}

export default Search;
