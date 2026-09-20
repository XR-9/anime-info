import MediaCard from "./MediaCard"
import './MediaGrid.css'
function MediaGrid({response}){
    const data = response[0].data
    console.log("enter mediaGrid")
    console.log(data)
    
    return (<>
    <div className="results-container">
        {data.map(data =>  data && (<MediaCard anime ={data}  key={data.id}/>))}
        {console.log("entring result")}

    </div>


    </>)
}

export default MediaGrid