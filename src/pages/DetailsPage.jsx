import { useParams } from "react-router-dom";
import "./DetailsPage.css"
import { usefav } from "../context/favContext";
import Information from "../Components/media/Information";
function DetailsPage({ allData }) {
    let { id } = useParams();
    let singleData = allData.filter(exp => exp.id === id);
    console.log(id)
    let attrs = singleData[0]?.attributes;
    const {favId , toggleFav} = usefav();
    console.log(favId)


    if(!attrs){
         let result =favId.filter(r => r.Id === id)
         attrs = result[0].Anime

    }

    const isFav = favId.some(r => r.Id ===id)

    return (
        <>
        <Information attrs = {attrs} isFav={isFav} id = {id}/>
        
        </>
    );
}

export default DetailsPage