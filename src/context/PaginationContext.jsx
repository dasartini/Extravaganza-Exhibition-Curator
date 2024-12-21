import { createContext, useContext, useState } from "react";

const PaginationContext = createContext()

export function PaginationProvider({ children }) {
  const [num, setNum] = useState(0)

  return (
    <PaginationContext.Provider value={{ num, setNum }}>
      {children}
    </PaginationContext.Provider>
  )
}

export function usePaginationContext() {
  return useContext(PaginationContext)
}