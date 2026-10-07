
import { usefav } from "../context/favContext";
import MediaCard from "../Components/media/MediaCard";


function FavouritePage(){
    const {favId , setFavId} = usefav()
    console.log(favId)

    return (
        <>
        <div style={{display: "grid" ,
            gridTemplateColumns : "repeat(5 , minmax(220px , 1fr)",
            gridAutoRows : "repeat(auto-fill)",
            gap :"10px"
        }}>{favId.map((data , i) =>  (<MediaCard  key={i} anime = {data?.Anime} id={data?.Id}/> ))}</div>
        </>
    )

}

export default FavouritePage