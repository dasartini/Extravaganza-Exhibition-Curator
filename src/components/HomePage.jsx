
import { useEffect } from "react";

import Design from "./Design";
import About from "./About";
function HomePage() {
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" })
  },[])


  return (
    <>
      <Design/>
      <About/>
    </>
  );

}

export default HomePage