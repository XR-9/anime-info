
import { useState } from "react";
import { usefav } from "../context/favContext";
import MediaCard from "../Components/media/MediaCard";
import EmptyState from "../Components/ui/EmptyState";


function FavouritePage(){
    const {favId , setFavId} = usefav()
    const [isFav] = useState(true)
    console.log(favId)

    return (
        <>
        {favId.length === 0 ? (
            <EmptyState
                isFav={isFav}
                emptyTitle="No Favourites Yet"
                emptySubtitle="Add anime to your favourites and they'll appear here"
            />
        ) : (
            <div style={{display: "grid" ,
                gridTemplateColumns : "repeat(5 , minmax(220px , 1fr)",
                gridAutoRows : "repeat(auto-fill)",
                gap :"10px"
            }}>{favId.map((data , i) =>  (<MediaCard  key={i} anime = {data?.Anime} id={data?.Id}/> ))}</div>
        )}
        </>
    )

}

export default FavouritePage