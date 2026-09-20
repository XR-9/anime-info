import './ErrorMessage.css'
function Errormessage({message , onretry}){
    return(<div className="error-container">
        <span className="error-icon">!</span>

        <h2>{message || "Something went wrong. Please try again."}</h2>

        

        <button onClick={onretry}>Try again</button>

    </div>
    )

}
export default Errormessage