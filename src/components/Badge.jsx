import badge from "../assets/images/badge.png"
function Badge(){
    return(<>

            <div className="badgecont">
              <img className="badge" src={badge} alt="Badge" />
              <div className="textCont">
                <p className={artwork.title.length > 20 ? "badgeTitle" : "badgeTitleShort"}>{artwork.title}</p>
                <p className={artwork.title.length > 20 ? "badgeAuthor" : "badgeAuthorShort "}>{artwork.artist}</p>
              </div>
            </div>
    </>)
}
export default Badge 