import "./MediaCard.css"
import { useNavigate } from "react-router-dom";
import { IconHeart } from '@tabler/icons-react';
import { useContext } from "react";
import { usefav } from "../../context/favContext";

function MediaCard({ anime }) {
    let navigate = useNavigate();
    const {favId , toggleFav} = usefav();
    let isFav = favId.includes(anime.id)
    const handleFavourite = (e) =>{
        e.stopPropagation()
        toggleFav(anime.id)

    }

    return (
        <div className="anime-card" onClick={() => navigate(`/details/${anime.id}`)}>
            {/* Poster + Score */}
            <div className="poster-wrapper">
                <img 
                    src={anime.attributes.posterImage.medium} 
                    alt={anime.attributes.posterImage.small} 
                    loading="lazy"
                />
                {anime.attributes.averageRating && (
                    <span className="score-badge">⭐ {anime.attributes.averageRating}</span>
                )}
               <button 
                    className={`type-badge fav ${isFav ? 'active' : ''}`}
                    onClick={handleFavourite}
                    aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                >
                    <IconHeart 
                        stroke={2} 
                        fill={isFav ? "currentColor" : "none"}
                    />
                </button>
                <span className="type-badge">{anime.attributes.showType}</span>
            </div>

            {/* Body */}
            <div className="card-body">
                <h3>{anime.attributes.canonicalTitle}</h3>

                <div className="meta">
                    <span>{anime.attributes.episodeCount || "?"} eps</span>
                    <span>•</span>
                    <span>{anime.attributes.createdAt.slice(0 , 10) || "TBA"}</span>
                    <span>•</span>
                    <span >
                        {anime.attributes.status}
                    </span>
                </div>

                <div className="genres">
                    {anime.attributes.genres.slice(0, 3).map((g , index) => (
                        <span key={index} className="genre-pill">{g}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MediaCard