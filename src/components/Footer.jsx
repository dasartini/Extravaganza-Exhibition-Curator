import FooterStyle from "../styles/FooterStyle";
import logo2 from "../assets/images/logo2.png"
import linkedin from "../assets/images/linkedin.svg"
import github from "../assets/images/github.svg"
import website from "../assets/images/website.svg"
import nft from "../assets/images/827.png" 
import {Link} from "react-router"
import extravaganza2 from "../assets/images/extravaganza2.png"
function Footer() {

    return (
        <FooterStyle>
          <div className="myfooter" aria-labelledby="footer-heading">
            <img
              className="extravaganza2"
              src={extravaganza2}
              alt="Logo for Extravaganza project"
            />
            <div>
              <h2 id="footer-heading">About This App</h2>
              <p>
                App designed and developed in React by Adrian Sartini. All rights
                reserved.
              </p>
              <hr className="solid" aria-hidden="true" />
              <p>
                Logos created with Leonardo AI, images fetched from respective
                museums' APIs.
              </p>
            </div>
            <div className="profilecont">
              <div className="socials">
                <h2 id="social-links">Find me on:</h2>
                <Link
                  to={"https://www.linkedin.com/in/adrian-sartini-051b352b1/"}
                  target="_blank"
                  aria-label="Visit Adrian's LinkedIn profile"
                >
                  <img
                    className="socialIcons"
                    alt="LinkedIn logo"
                    title="My LinkedIn"
                    src={linkedin}
                  />
                </Link>
                <Link
                  to={"https://github.com/dasartini"}
                  target="_blank"
                  aria-label="Visit Adrian's GitHub profile"
                >
                  <img
                    className="socialIcons"
                    alt="GitHub logo"
                    title="My GitHub"
                    src={github}
                  />
                </Link>
                <Link
                  to={"https://asartini.dev/"}
                  target="_blank"
                  aria-label="Visit Adrian's personal portfolio website"
                >
                  <img
                    className="socialIcons"
                    alt="Website logo"
                    title="My portfolio website"
                    src={website}
                  />
                </Link>
              </div>
              <div className="socials">
                <img
                  className="nft"
                  alt="Personal NFT artwork by Adrian"
                  title="Personal NFT"
                  src={nft}
                />
                <h3 aria-label="Email address">adriansartinid@gmail.com</h3>
              </div>
            </div>
          </div>
        </FooterStyle>
      );
}

export default Footer