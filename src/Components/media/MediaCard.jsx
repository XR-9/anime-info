import "./MediaCard.css"

// function MediaCard({anime}){

//     return (<div>

//         <img src={anime.images.jpg.image_url}></img>

//         <div className="card-body">
//             <h1>naruto</h1>
//             <div className="meta">
//                 <span>{anime.episodes || "?"}epis</span>
//                 <span>•</span>
//                 <span>{anime.year || "TBA"}</span>
//                 <span>•</span>
//                 <span>{anime.status}</span>
//             </div>

//             <div className="genres">
//                 <span className="genre-pill"></span>
//             </div>
//         </div>

//     </div>)

// }

// export default MediaCard

function MediaCard({ anime }) {
    return (
        <div className="anime-card">
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