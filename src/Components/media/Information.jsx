import { IconChevronLeft, IconHeart } from '@tabler/icons-react';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { usefav } from '../../context/favContext';
function Information({attrs ,isFav , id}){
    const {favId , toggleFav} = usefav();

    let navigate = useNavigate();
    const youtubeOpen = () => {
        window.open(`https://www.youtube.com/watch?v=${attrs.youtubeVideoId}` , `_blank`)
    }

    const formatDate = (date) => {
        if (!date) return "?";
        return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };
    const handleNavigation =() => {
        navigate(-1)
    }
    function formatFav(favCount){
        if(favCount > 1000){
            return `${Math.floor(favCount / 1000)}k`
        }
        else return favCount

    }
    return (<>
    <div className="bts-container"><button onClick={handleNavigation}><IconChevronLeft stroke={2} className="btn-icon"/>Back to SearchPage</button></div>
        <div className="details-page">
            <div className="detail-cont">
                <div className="left-cont">
                    <img src={attrs?.posterImage?.original} alt={attrs?.canonicalTitle} />
                    <div className="sub-left-cont">
                        <button className={`fav-btn ${isFav ? "active" : ""}`} onClick={() =>toggleFav(id , attrs)} title={isFav
                                ? "Remove from favourites" :"Added to Favourites"
                                }>
                            <IconHeart stroke={2} className="icon" />
                            {isFav
                                ? "Added to Favourites"
                                : `Add to Favourites${attrs?.favoritesCount ? ` (${formatFav(attrs.favoritesCount)})`: ""
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
    </>)


}

export default Information