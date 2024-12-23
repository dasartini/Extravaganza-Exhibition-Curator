import HomePageStyle from "../styles/HomePageStyle";
import image from "../assets/images/homepageImg.jpg"
import {Link } from "react-router"
function HomePage(){

    return(
   
   <>
   <HomePageStyle>
    <div className="homePageCont">
        <h1> EXTRAVAGANZA</h1>
        <br></br>
        <br></br>
        <div className="quote">
        <img  className="quoteImg"src={image}/>
        <h3>"<b>Art cannot be criticised because every mistake is a new creation.</b>" – Mr. Brainwash</h3></div>
        <br></br>
        <div className="homePageText">
        According to the Cambridge dictionary, <i>extravaganza</i> means:<br></br> <br></br>
        <i>"a large, exciting, and expensive event or entertainment"</i><br></br>      
          <p>For me, as an art lover, <i>Extravaganza</i> means something amazing – something that represents an escape from routine.
          Something remarkable, capable of leaving a lasting impact on the collective mind. </p><br></br>
        <p>Taking art and history as inspiration, this web application allows you to explore amazing artworks from famous museums worldwide.</p>
        <p>Here, you will discover many renowned artists who have left their mark on the world. But you will also encounter artists whose names you may not recognise, yet whose works are equally extraordinary.</p><br></br>
        <p> Feel free to navigate between the different museums available. You can also add artworks to your personal gallery and reorder them however you like.</p>
        <p>And the best part? You can show your gallery with friends in a slideshow.</p>
        <br></br>
        <p>Enjoy exploring the ways different souls express themselves. </p>
        </div>
        <br></br><br></br>
        <mark style={{background:"#000", color: "#fff"}}> <Link to={'/museums'}> <h3>Explore the museums</h3></Link> </mark>
    </div>
    </HomePageStyle>
    </>
    )

}

export default HomePage