import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <>
    <Router>
      <App />
      <Toaster closeButton/>
    </Router>
 </>
  
)
