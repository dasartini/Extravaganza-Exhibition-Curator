import './Boxie.css'
function Boxie(props){
const { children} = props
return(
<div className="Boxie"> {children}</div>

)

}
export default Boxie