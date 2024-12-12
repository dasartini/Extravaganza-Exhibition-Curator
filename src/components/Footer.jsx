import FooterStyle from "../styles/FooterStyle";
import logo2 from "../assets/images/logo2.png"
import linkedin from "../assets/images/linkedin.svg"
import github from "../assets/images/github.svg"
import website from "../assets/images/website.svg"
import nft from "../assets/images/827.png" 
import {Link} from "react-router"

function Footer() {

    return (
        <FooterStyle>
            <div className="myfooter">
                <div className="headcont">
                    <img src={logo2} className="head" />
                    <div className="footertitle">
                        <h1>Extravaganza</h1>
                        <p>Art Curator</p>
                    </div>
                </div>

                <div>
                    <p>App designed and developed in React by Adrian Sartini. All rights reserved.</p>
                    <hr className="solid"></hr>
                    <p>Logos created with Leonardo AI, images fetched from respective museums' APIs.</p>
                </div>
            <div className="profilecont">
                <div className="socials">
            <h2>Find me on:</h2>
           <Link to={"https://www.linkedin.com/in/adrian-sartini-051b352b1/"} target="_blank"> <img className="socialIcons" alt="Linkedin logo" title="My Linkedin" src={linkedin}/></Link>
           <Link to={"https://github.com/dasartini"} target="_blank">  <img className="socialIcons" alt="Github logo" title="My Github" src={github}/></Link>
           <Link to={"https://asartini.dev/"} target="_blank"> <img className="socialIcons" alt="Website logo" title="My portfolio website" src={website}/></Link>
            </div>
            <div className="socials">
            <img className="nft" alt="Personal Nft" title="Retardio NFT" src={nft}/>
            <h3>adriansartind@gmail.com</h3>
            </div>
            </div>

            </div>
        </FooterStyle>
    )
}

export default Footer