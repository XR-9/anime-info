import './ErrorMessage.css'
function Errormessage({message , onretry}){
    return(<section className="error-container">
        <span className="error-icon">!</span>

        <h2>{message}</h2>

        

        <button onClick={onretry}>Try again</button>

    </section>
    )

}
export default Errormessage