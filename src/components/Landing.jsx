import LandingStyle from "../styles/LandingStyle"
import chicago from '../assets/images/chicago.jpg'
function Landing(){

    return(
  <main>
<LandingStyle>
        <div class="search-section">
      <h2 class="section-title">Search by museum</h2>
      <div class="museum-cards">
        <div class="card">
          <img src={chicago} alt="Art Institute of Chicago " class="card-image"/>
          <h3 class="card-title">Art Institute of Chicago</h3>
        </div>
        <div class="card">
          <img src="https://i.ytimg.com/vi/yBrPz5aCXdM/maxresdefault.jpg" alt="Palazzo Pitti" class="card-image"/>
          <h3 class="card-title">Cleveland Museum Of Art</h3>
        </div>
      </div>
    </div>
    </LandingStyle>
    </main>
    )
}

export default Landing