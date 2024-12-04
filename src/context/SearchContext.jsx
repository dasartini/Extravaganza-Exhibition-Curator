import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext()
export const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState('')
    const [chicagoQuery, setChicagoQuery] = useState('')

    return (
        <SearchContext.Provider value={{ query, setQuery , chicagoQuery, setChicagoQuery}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext)
