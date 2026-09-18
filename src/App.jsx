import { Routes , Route } from 'react-router-dom'
import { useState } from 'react'
import SearchPage from './pages/SearchPage'
import DetailsPage from './pages/DetailsPage'
import FavouritePage from './pages/FavouritesPage'
import Navbar from './Components/layout/navbar'
import './App.css'

function App() {

  return (
    <>
    <Navbar/>

    <main>
      <Routes>
        <Route path='/' element = {<SearchPage/>}/>
        <Route path='/details/:id' element = {<DetailsPage/>}/>
        <Route path='/favourites' element = {<FavouritePage/>}/>
      </Routes>
    </main>
    </>
  )
}

export default App
