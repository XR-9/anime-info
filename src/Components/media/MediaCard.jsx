import "./MediaCard.css"
import { useNavigate } from "react-router-dom";
import { IconHeart } from '@tabler/icons-react';
import { useContext } from "react";
import { usefav } from "../../context/favContext";

function MediaCard({ anime  , id}) {
    let navigate = useNavigate();
    const {favId , toggleFav} = usefav();
    let isFav = favId.some(r => r.Id ===id)
    const handleFavourite = (e) =>{
        e.stopPropagation()
        toggleFav(id ,anime)

    }

    return (
        <div className="anime-card" onClick={() => navigate(`/details/${id}`)}>
            {/* Poster + Score */}
            <div className="poster-wrapper">
                <img 
                    src={anime.posterImage.medium} 
                    alt={anime.posterImage.small} 
                    loading="lazy"
                />
                {anime.averageRating && (
                    <span className="score-badge">⭐ {anime.averageRating}</span>
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
                <span className="type-badge">{anime.showType}</span>
            </div>

            {/* Body */}
            <div className="card-body">
                <h3>{anime.canonicalTitle}</h3>

                <div className="meta">
                    <span>{anime.episodeCount || "?"} eps</span>
                    <span>•</span>
                    <span>{anime.createdAt.slice(0 , 10) || "TBA"}</span>
                    <span>•</span>
                    <span >
                        {anime.status}
                    </span>
                </div>

                <div className="genres">
                    {anime.genres.slice(0, 3).map((g , index) => (
                        <span key={index} className="genre-pill">{g}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MediaCard