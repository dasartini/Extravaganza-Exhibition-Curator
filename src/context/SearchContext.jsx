import React, { createContext, useState, useContext } from "react"

const SearchContext = createContext()
export const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState(true)

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext)
