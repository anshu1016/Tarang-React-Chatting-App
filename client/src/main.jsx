import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner.jsx'
import { SocketProvider } from './context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <>
 <SocketProvider>
    <Router>
      <App />
      <Toaster closeButton/>
    </Router>
    </SocketProvider>
 </>
  
)
