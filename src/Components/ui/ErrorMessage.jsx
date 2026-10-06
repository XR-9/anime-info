import { useSearch } from '../../context/searchContext'
import './ErrorMessage.css'
function Errormessage(){
    const {error} = useSearch()
    return(<div className="error-container">
        <span className="error-icon">!</span>

        <h2>{error || "Something went wrong. Please try again."}</h2>

        

        <button >Try again</button>

    </div>
    )

}
export default Errormessage