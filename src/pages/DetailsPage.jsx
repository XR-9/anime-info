import { useNavigate, useParams } from "react-router-dom";
import "./DetailsPage.css"
import { IconChevronLeft, IconHeart } from '@tabler/icons-react';
import { IconPlayerPlay } from '@tabler/icons-react';
import { usefav } from "../Components/context/favContext";
function DetailsPage({ allData }) {
    let { id } = useParams();
    let navigate = useNavigate();
    let singleData = allData.filter(exp => exp.id === id);
    singleData = singleData[0];
    const {favId , toggleFav} = usefav();
    console.log(favId)


    const attrs = singleData?.attributes;
    const isFav = favId.includes(id)
    console.log(isFav)

    const youtubeOpen = () => {
        window.open(`https://www.youtube.com/watch?v=${attrs.youtubeVideoId}` , `_blank`)
    }

    const formatDate = (date) => {
        if (!date) return "?";
        return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };
    const handleNavigation =() => {
        navigate(1)
    }

    return (
        <>
        <div className="bts-container"><button onClick={handleNavigation}><IconChevronLeft stroke={2} className="btn-icon"/>Back to SearchPage</button></div>
        <div className="details-page">
            <div className="detail-cont">
                <div className="left-cont">
                    <img src={attrs?.posterImage?.original} alt={attrs?.canonicalTitle} />
                    <div className="sub-left-cont">
                        <button className={`fav-btn ${isFav ? "active" : ""}`} onClick={() =>toggleFav(id)} title={isFav
                                ? "Remove from favourites" :"Added to Favourites"
                                }>
                            <IconHeart stroke={2} className="icon" />
                            {isFav
                                ? "Added to Favourites"
                                : `Add to Favourites${attrs?.favoritesCount ? ` (${attrs.favoritesCount})` : ""
                                }`
                            }
                        </button>
                        <button className="trailer-btn" onClick={youtubeOpen} title="Watch Trailer">
                            <IconPlayerPlay stroke={2} className="icon" />
                            Watch Trailer
                        </button>
                    </div>
                </div>

                <div className="right-cont">
                    <div className="anime-name">{attrs?.canonicalTitle}</div>
                    <div className="anime-jap">{attrs?.titles?.ja_jp}</div>

                    <div className="stats-cont">
                        {attrs?.averageRating && (
                            <span className="rating-badge">
                                ★ {parseFloat(attrs.averageRating).toFixed(1)}%
                            </span>
                        )}
                        {attrs?.popularityRank && (
                            <span className="stat-pill"><span>#{attrs.popularityRank} </span>Popularity</span>
                        )}
                        {attrs?.ratingRank && (
                            <span className="stat-pill"><span>#{attrs.ratingRank} </span>Ranked</span>
                        )}
                    </div>

                    <div className="genres-cont">
                        {attrs?.genres.map((genre, i) => (
                            <span key={i} className={`genre-tag genre-${i % 6}`}>{genre}</span>
                        ))}
                    </div>

                    <div className="disc-cont">
                        {attrs?.synopsis}
                    </div>

                    <div className="bottom-row">
                        <div className="meta-cont">
                            <div className="meta-title">Metadata</div>
                            <div className="meta-line"><span>Type:</span> {attrs?.showType?.toUpperCase()}</div>
                            <div className="meta-line"><span>Status:</span> {(attrs?.status ? attrs?.status : attrs?.tba)}</div>
                            <div className="meta-line">
                                <span>Episodes:</span> {attrs?.episodeCount ?? "?"}
                                {attrs?.episodeLength ? ` • ${attrs?.episodeLength}m` : ""}
                            </div>
                            <div className="meta-line">
                                <span>Aired:</span> {formatDate(attrs?.startDate)} - {attrs?.endDate ? formatDate(attrs.endDate) : "Present"}
                            </div>
                            <div className="meta-line"><span>Age Rating:</span> {attrs?.ageRating} {attrs?.ageRatingGuide}</div>
                        </div>

                        {attrs?.youtubeVideoId && (
                            <a
                                className="trailer-thumb"
                                href={`https://www.youtube.com/watch?v=${attrs?.youtubeVideoId}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={`https://img.youtube.com/vi/${attrs?.youtubeVideoId}/hqdefault.jpg`}
                                    alt="trailer thumbnail"
                                />
                                <span className="play-overlay">
                                    <IconPlayerPlay stroke={2} className="play-icon" />
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default DetailsPage