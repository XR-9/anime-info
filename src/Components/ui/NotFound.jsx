import './NotFound.css';

export default function NotFound({
  code,
  title ,
  description,
  onGoHome,
  onGoBack,
}) {
  const handleGoBack = () => {
    if (onGoBack) return onGoBack();
    if (typeof window !== "undefined") window.history.back();
  };

  const handleGoHome = () => {
    if (onGoHome) return onGoHome();
    if (typeof window !== "undefined") window.location.assign("/");
  };

  return (
    <main className="nfp">
      <section className="nfp__card" role="alert" aria-labelledby="nfp-title">
        <div className="nfp__art">
          <svg
            className="nfp__svg"
            viewBox="0 0 260 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="An empty browser window with a question mark and a magnifying glass"
          >
            {/* soft halo */}
            <circle cx="130" cy="90" r="68" fill="var(--primary)" opacity="0.06" />

            {/* browser window */}
            <rect
              x="46" y="30" width="168" height="116" rx="16"
              stroke="var(--primary)" strokeOpacity="0.45" strokeWidth="2.5"
            />
            <path
              d="M46 62h168"
              stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="2.5"
            />
            <circle cx="64" cy="46" r="3.5" fill="var(--muted)" />
            <circle cx="78" cy="46" r="3.5" fill="var(--primary)" opacity="0.45" />
            <circle cx="92" cy="46" r="3.5" fill="var(--primary)" opacity="0.22" />

            {/* question mark */}
            <path
              d="M114 84c0-9 7-15 16-15s16 6 16 15c0 7-4 10-10 13-4 2-5 4-5 8v3"
              stroke="var(--muted)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="131" cy="117" r="2.8" fill="var(--muted)" />

            {/* magnifying glass */}
            <circle
              cx="196" cy="124" r="22"
              fill="var(--glass-bg)"
              stroke="var(--muted)"
              strokeWidth="3.5"
            />
            <path
              d="M212 140l13 13"
              stroke="var(--muted)" strokeWidth="4" strokeLinecap="round"
            />

            {/* small accents */}
            <circle cx="30" cy="58" r="4" fill="var(--muted)" opacity="0.35" />
            <circle cx="232" cy="46" r="5" fill="var(--primary)" opacity="0.25" />
            <path
              d="M28 122h11M33.5 116.5v11"
              stroke="var(--primary)" strokeOpacity="0.3"
              strokeWidth="2.5" strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="nfp__code">{code}</p>

        <h1 className="nfp__title" id="nfp-title">{title}</h1>

        <p className="nfp__desc">{description}</p>


        <div className="nfp__actions">
          <button
            type="button"
            className="nfp__btn nfp__btn--primary"
            onClick={handleGoHome}
          >
            Back to home
          </button>
          <button
            type="button"
            className="nfp__btn nfp__btn--ghost"
            onClick={handleGoBack}
          >
            Go back
          </button>
        </div>
      </section>
    </main>
  );
}