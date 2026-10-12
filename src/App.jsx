import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import Navbar from './Components/layout/Navbar'
import './App.css'
import { FavContextProvider } from './context/favContext'
import { SearchContextProvider } from './context/searchContext'
import { ErrorBoundary } from "react-error-boundary";
import SearchPage from './pages/SearchPage'
import ErrorState from "./assets/computer.png";

import Loader from './Components/ui/Loader'
const DetailsPage = lazy(()=>import('./pages/DetailsPage'))
const FavouritePage = lazy(() => import('./pages/FavouritesPage'))

function App() {
  const [allData, setAllData] = useState([])

  const ErrorFallback = ({error ,resetErrorBoundary}) => {
    return(<>
    <div className='fallback-error-cont'>
       <img
                  src={ErrorState}
                  alt="error"
                  className="empty-image"
                  loading="lazy"
              />
      <h2>Error occured</h2>
      <p>Status : {error?.status || 500}
      </p>
      {error.message ? (<p><span>Reason </span> : {error.message}</p>) : null}
      <div className='bts-container'>
      <button onClick={resetErrorBoundary} >
        Try again
      </button>
      </div>

    </div>
    </>)

  }



  return (
    <>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SearchContextProvider>
        <FavContextProvider>
          <Navbar />

          <main>
            <Routes>
              <Route path='/' element={<SearchPage allData={allData} setAllData={setAllData} />}/>
              <Route path='/details/:id' element={allData && <Suspense fallback ={<Loader/>}>
                <DetailsPage allData={allData} setAllData={setAllData}></DetailsPage>
                </Suspense>}/>
              <Route path='/favourites' element={
                <Suspense fallback ={<Loader/>}>
                <FavouritePage />
                </Suspense>} />
            </Routes>
          </main>
        </FavContextProvider>
      </SearchContextProvider>

      </ErrorBoundary>
    </>
  )
}

export default App
