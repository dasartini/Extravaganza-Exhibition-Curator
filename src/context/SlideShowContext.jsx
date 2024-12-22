import { createContext, useContext, useState } from "react";

const SlideShowContext = createContext()

export function SlideShowProvider({ children }) {
  const [isSlideShowOpen, setIsSlideShowOpen] = useState(false)

  return (
    <SlideShowContext.Provider value={{ isSlideShowOpen, setIsSlideShowOpen }}>
      {children}
    </SlideShowContext.Provider>
  )
}

export function useSlideShowContext() {
  return useContext(SlideShowContext)
}