import React, { createContext, useState, useContext } from "react"

const SearchContext = createContext()
export const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState('')

    return (
        <SearchContext.Provider value={{ query, setQuery }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext)
