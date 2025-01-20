import './App.css';
import Header from './components/Header';
import Landing from './components/Landing';
import Footer from './components/Footer';
import AllArtworks from './components/AllArtworks';
import { Routes, Route } from 'react-router';
import AllArtworks2 from './components/AllArtworks2';
import SingleArtwork from './components/SingleArtwork';
import SingleArtwork2 from './components/SingleArtwork2';
import { PageProvider } from './context/PageContext';
import { VisibleProvider } from './context/VisibleContext';
import { SearchProvider } from './context/SearchContext';
import { SavedArtworksProvider } from './context/SavedArtworksContext';
import { PaginationProvider } from "./context/PaginationContext";
import { SlideShowProvider } from './context/SlideShowContext';
import SavedArtworks from './components/SavedArtworks';
import Slideshow from './components/Slideshow';
import ErrPage from './components/ErrPage';
import HomePage from './components/HomePage';
import Login from './components/Login';
import { LoginProvider } from './context/LoginContext';
import { useEffect } from 'react';
import { useLoginContext } from "./context/LoginContext"
import Share from './components/Share';



function App() {
  const{setIsLoggedIn, setUser} = useLoginContext()
  useEffect(()=>{},[setIsLoggedIn, setUser])

  return (
      <VisibleProvider>
        <SavedArtworksProvider>
          <SlideShowProvider>
        <SearchProvider>
      <PaginationProvider>
          <div className="app">
    <Header/>
  <PageProvider>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/museums' element={<Landing/> }/>
      <Route path='/museums/chicago-institute-of-art' element={<AllArtworks/>}/>
      <Route path='/museums/chicago-institute-of-art/:artwork_id' element={<SingleArtwork/>}/>
      <Route path='/museums/cleveland-art-museum' element={<AllArtworks2/>}/>
      <Route path='/museums/cleveland-art-museum/:artwork_id' element={<SingleArtwork2/>}/>
      <Route path='/gallery' element={<SavedArtworks/>}/>
      <Route path='/gallery/slideshow' element={<Slideshow/>}/>
      <Route path='/*' element={<ErrPage/>}/>
      <Route path='/log-in' element={<Login/>}/>
      <Route path="/share" element={<Share/>}/>

  
    </Routes>
    </PageProvider>
    <Footer/>
    </div>
    </PaginationProvider>
    </SearchProvider>
    </SlideShowProvider>
    </SavedArtworksProvider>
    </VisibleProvider>
  )
}

export default App
