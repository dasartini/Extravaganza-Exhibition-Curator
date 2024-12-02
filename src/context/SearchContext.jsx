import { createContext, useState } from 'react';


export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [Search, setSearch] = useState("dark");
    return (
        <SearchContext.Provider value={{ Search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider