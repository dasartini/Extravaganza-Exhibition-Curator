import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router'
import SearchProvider from './context/SearchContext.jsx'


createRoot(document.getElementById('root')).render(
    <SearchProvider>
<BrowserRouter>
    <App />
    </BrowserRouter>
    </SearchProvider>
)
