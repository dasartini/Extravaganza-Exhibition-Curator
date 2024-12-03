import React, { createContext, useState, useContext } from "react"

const VisibleContext = createContext()
export const VisibleProvider = ({ children }) => {
    const [visible, setVisible] = useState(true)

    return (
        <VisibleContext.Provider value={{ visible, setVisible }}>
            {children}
        </VisibleContext.Provider>
    )
}

export const useVisibleContext = () => useContext(VisibleContext)
