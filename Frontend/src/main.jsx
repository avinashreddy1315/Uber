import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import UserContext from './context/UserContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CaptainContext from './context/CaptainContext.jsx';
import SocketProvider from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <BrowserRouter>
        <CaptainContext>
          <UserContext>
          <SocketProvider>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <App />
            </GoogleOAuthProvider>
            </SocketProvider>
          </UserContext>
        </CaptainContext>
      </BrowserRouter>
   
  </StrictMode>,
)
