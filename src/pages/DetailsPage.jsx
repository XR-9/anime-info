import { useParams } from "react-router-dom";
import "./DetailsPage.css"
import { usefav } from "../context/favContext";
import Information from "../Components/media/Information";
function DetailsPage({ allData }) {
    let { id } = useParams();
    let singleData = allData.filter(exp => exp.id === id);
    let attrs = singleData[0]?.attributes;
    const {favId , toggleFav} = usefav();

    if(!attrs){
         attrs =favId.filter(r => r.Id === id)?.Anime

    }
    const isFav = favId.some(r => r.Id ===id)


    return (
        <>
        <Information attrs = {attrs} isFav={isFav} id = {id}/>
        
        </>
    );
}

export default DetailsPage