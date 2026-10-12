
import { useState } from "react";
import { usefav } from "../context/favContext";
import MediaCard from "../Components/media/MediaCard";
import EmptyState from "../Components/ui/EmptyState";
import "../Components/media/MediaGrid.css"


function FavouritePage(){
    const {favId , setFavId} = usefav()
    const [isFav] = useState(true)

    return (
        <>
        {favId.length === 0 ? (
            <EmptyState
                isFav={isFav}
                emptyTitle="No Favourites Yet"
                emptySubtitle="Add anime to your favourites and they'll appear here"
            />
        ) : (
            <div className="results-container">{favId.map((data , i) =>  (<MediaCard  key={i} anime = {data?.Anime} id={data?.Id}/> ))}</div>
        )}
        </>
    )

}

export default FavouritePage