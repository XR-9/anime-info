import "./MediaCardSkeleton.css";

function MediaCardSkeleton({ count }) {
    return (
        <div className="skeleton-main-cont">
            {Array(count).fill(0).map((_, i) => (
                <div className="anime-card skeleton-card" key={i}>
                    {/* Poster */}
                    <div className="poster-wrapper skeleton-poster">
                        <div className="sk sk-fill" />

                        <div className="skeleton-badge-tl">
                            <div className="sk" style={{ height: 24, width: 50 }} />
                        </div>
                        <div className="skeleton-badge-tr">
                            <div className="sk" style={{ height: 34, width: 34 }} />
                        </div>
                        <div className="skeleton-badge-br">
                            <div className="sk" style={{ height: 22, width: 55 }} />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="card-body">
                        <div className="sk" style={{ height: 20, width: "85%" }} />

                        <div className="meta">
                            <div className="sk" style={{ height: 14, width: 45 }} />
                            <div className="sk" style={{ height: 14, width: 55 }} />
                            <div className="sk" style={{ height: 14, width: 65 }} />
                        </div>

                        <div className="genres">
                            <div className="sk sk-pill" style={{ height: 22, width: 60 }} />
                            <div className="sk sk-pill" style={{ height: 22, width: 75 }} />
                            <div className="sk sk-pill" style={{ height: 22, width: 50 }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MediaCardSkeleton;