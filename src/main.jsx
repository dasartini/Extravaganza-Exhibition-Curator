import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { LoginProvider } from './context/LoginContext';



createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <LoginProvider>
        <App />
        </LoginProvider>
    </BrowserRouter>
)
