import React, { createContext, useState, useContext } from "react";

const PageContext = createContext()
export const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <PageContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </PageContext.Provider>
    )
}

export const usePageContext = () => useContext(PageContext)
