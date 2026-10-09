import "./EmptyState.css";
import emptyStateImg from "../../assets/empty-state.png";
import Error404 from "../../assets/error-404.png"
import { useNavigate } from "react-router-dom";

const SUGGESTIONS = ["Naruto", "One Piece", "Attack on Titan", "Demon Slayer", "Death Note"];

function FavIcon() {
    return (
        <img
            src={emptyStateImg}
            alt="No favourites"
            className="empty-image"
            loading="lazy"
        />
    );
}
function SearchIcon({ hasQuery }) {
    if (hasQuery) {
        return (
            <img
                src={Error404}
                alt="404"
                className="empty-image"
                loading="lazy"
            />
        );
    }

    return (
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="31" cy="31" r="22" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="47" y1="47" x2="64" y2="64" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="24" cy="29" r="2" fill="black" />
            <circle cx="38" cy="29" r="2" fill="black" />
            <line x1="25" y1="37" x2="37" y2="37" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

function EmptyState({ query, onSuggestionClick, emptyTitle, emptySubtitle, isFav = false }) {
    const hasQuery = query && query.trim().length > 0;
    const navigate  = useNavigate();

    return (
        <div className="empty-state">

           
            <div className="empty-icon">
                {isFav ? <FavIcon /> : <SearchIcon hasQuery={hasQuery} />}
            </div>

           
            <div className="empty-title">
                {emptyTitle || (hasQuery ? "No results found" : "Start searching")}
            </div>
            <div className="empty-subtitle">
                {emptySubtitle || (hasQuery
                    ? `We couldn't find anything for "${query}"`
                    : "Search for your favourite anime above")}
            </div>

            <div className="bts-container">
                {isFav && (<button onClick={() => navigate("/") } className="">

                    Go to SearchPage
                </button>)
                }

            </div>

            {!isFav && !hasQuery && (
                <div className="empty-suggestions">
                    <span className="empty-suggestions-label">Try:</span>
                    {SUGGESTIONS.map((s) => (
                        <button
                            key={s}
                            className="empty-chip"
                            onClick={() => onSuggestionClick?.(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default EmptyState;