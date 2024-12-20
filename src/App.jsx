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
import SavedArtworks from './components/SavedArtworks';
import Slideshow from './components/Slideshow';
import ErrPage from './components/ErrPage';
function App() {

  return (
      <VisibleProvider>
        <SavedArtworksProvider>
        <SearchProvider>
      <PaginationProvider>
          <div className="app">
    <Header/>
  <PageProvider>
    <Routes>
      <Route path='/' element={<Landing/> }/>
      <Route path='/chicago-institute-of-art' element={<AllArtworks/>}/>
      <Route path='/chicago-institute-of-art/:artwork_id' element={<SingleArtwork/>}/>
      <Route path='/cleveland-art-museum' element={<AllArtworks2/>}/>
      <Route path='/cleveland-art-museum/:artwork_id' element={<SingleArtwork2/>}/>
      <Route path='/gallery' element={<SavedArtworks/>}/>
      <Route path='/gallery/slideshow' element={<Slideshow/>}/>
      <Route path='/*' element={<ErrPage/>}/>
  
    </Routes>
    </PageProvider>
    <Footer/>
    </div>
    </PaginationProvider>
    </SearchProvider>
    </SavedArtworksProvider>
    </VisibleProvider>
  )
}

export default App
