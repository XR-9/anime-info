# Anime Info

A fast, responsive anime search app built with React. Search thousands of titles from the [Kitsu API](https://kitsu.docs.apiary.io/), browse paginated results, open detailed pages, and save your favourites.

**Live demo:** <>

## Features

- **Live search** with a 500ms debounce. The query and page number live in the URL (`?q=naruto&page=2`), so searches can be shared and survive a refresh.
- **Pagination** with the next page prefetched in the background for near-instant navigation.
- **Details page** with poster, ratings, rankings, genres, synopsis, metadata, and a trailer link.
- **Favourites** saved in `localStorage`, available from the cards and the details page.
- **Smart API layer**: in-memory cache (5 min TTL), automatic retry with exponential backoff, and `AbortController` to cancel stale requests.
- **Polished UX**: skeleton loaders, empty states, friendly error screens (429 / 5xx / network), and an error boundary.
- **Code splitting**: details and favourites pages are lazy-loaded.
- **Responsive** layout from mobile to desktop (up to 5 cards per row).
- **Tested** with Vitest and React Testing Library.

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | React, Vite |
| Routing | React Router |
| State | Context API, `useState`, `useEffect`, `useRef` |
| Data | Kitsu REST API (JSON:API) |
| Icons | Tabler Icons |
| Error handling | react-error-boundary |
| Testing | Vitest, React Testing Library, jest-dom |
| Hosting | Vercel |

## Project Structure

```
anime-info/
├── public/
├── src/
│   ├── assets/                  # images for empty / error states
│   ├── Components/
│   │   ├── layout/
│   │   │   └── Navbar.jsx
│   │   ├── media/
│   │   │   ├── Information.jsx  # details view
│   │   │   ├── MediaCard.jsx
│   │   │   ├── MediaGrid.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── SearchBar.jsx
│   │   └── ui/
│   │       ├── EmptyState.jsx
│   │       ├── Loader.jsx
│   │       ├── MediaCardSkeleton.jsx
│   │       └── NotFound.jsx
│   ├── context/
│   │   ├── favContext.jsx       # favourites + localStorage
│   │   └── searchContext.jsx    # loading, error, cached pages
│   ├── pages/
│   │   ├── SearchPage.jsx
│   │   ├── DetailsPage.jsx
│   │   └── FavouritesPage.jsx
│   ├── services/
│   │   └── CallApi.js           # fetching, caching, retry
│   ├── test/                    # Vitest + React Testing Library
│   │   ├── MediaCard.test.jsx
│   │   ├── Pagination.test.jsx
│   │   ├── SearchBar.test.jsx
│   │   ├── UseFav.test.jsx
│   │   └── setupTest.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── vercel.json                  # SPA rewrite for client-side routing
├── vite.config.js
└── package.json
```

Each component keeps its own `.css` file next to its `.jsx` file.

## Getting Started

```bash
# clone the repo
git clone https://github.com/XR-9/anime-info.git
cd anime-info

# install dependencies
npm install

# start the dev server
npm run dev

# run the tests
npm test

# production build
npm run build
```

No API key is needed. Kitsu's public API is used.

## What I Learned

- Keeping UI state in the URL with `useSearchParams` instead of local state.
- Debouncing input and cancelling in-flight requests to avoid race conditions.
- Building a small caching and retry layer around `fetch`.
- Sharing state with Context and persisting it to `localStorage`.
- Writing component and hook tests with React Testing Library.

## Future Improvements

- Search and sort inside Favourites
- Filters by genre, year, and status
- "Currently airing" and "Top rated" sections

## Acknowledgements

Anime data provided by [Kitsu](https://kitsu.io/).