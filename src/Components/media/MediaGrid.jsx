import MediaCard from "./MediaCard"
import './MediaGrid.css'
function MediaGrid({data , totalCount , totalPage , currentPage}){
    console.log(data)
    return (<>
    <div className="ms-cont">
        <div className="result-stat">
            <div className="sub-rs">{totalCount} Results found</div>
            <div className="sub-rs">{currentPage} out of {totalPage} Page</div>
        </div>
        <div className="results-container">{data.map(data =>  data && (<MediaCard anime ={data}  key={data.id}/>))}</div>

    </div>


    </>)
}

export default MediaGrid