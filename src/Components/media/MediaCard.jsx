import "./MediaCard.css"
import { useNavigate } from "react-router-dom";

function MediaCard({ anime }) {
    let navigate = useNavigate();
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
                    {anime.attributes.genres.slice(0, 3).map(g => (
                        <span key={g} className="genre-pill">{g}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MediaCard