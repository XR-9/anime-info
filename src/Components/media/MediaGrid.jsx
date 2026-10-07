import MediaCard from "./MediaCard"
import './MediaGrid.css'
function MediaGrid({data , totalCount , totalPage , currentPage}){
    console.log(data)
    window.scrollTo(0,0)
    return (<>
    <div className="ms-cont">
        <div className="result-stat">
            <div className="sub-rs"><span>{totalCount}</span> Results found</div>
            <div className="sub-rs"><span>{currentPage}</span> out of {totalPage} Page</div>
        </div>
        <div className="results-container">{data.map(data =>  data && (<MediaCard anime ={data.attributes}  id = {data.id} key={data.id}/>))}</div>

    </div>


    </>)
}

export default MediaGrid