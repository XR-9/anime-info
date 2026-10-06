import { Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react'
import SearchPage from './pages/SearchPage'
import DetailsPage from './pages/DetailsPage'
import FavouritePage from './pages/FavouritesPage'
import Navbar from './Components/layout/navbar'
import './App.css'
import { FavContextProvider } from './context/favContext'
import { SearchContextProvider } from './context/searchContext'

function App() {
  const [allData, setAllData] = useState([])
  console.log(allData)

  return (
    <>
      <SearchContextProvider>
        <FavContextProvider>
          <Navbar />

          <main>
            <Routes>
              <Route path='/' element={<SearchPage allData={allData} setAllData={setAllData} />} />
              <Route path='/details/:id' element={allData && <DetailsPage allData={allData} setAllData={setAllData}></DetailsPage>} />
              <Route path='/favourites' element={<FavouritePage />} />
            </Routes>
          </main>
        </FavContextProvider>
      </SearchContextProvider>
    </>
  )
}

export default App
