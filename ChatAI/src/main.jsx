import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/context.jsx'

//  import React from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 
    <ContextProvider>
    <App />
    </ContextProvider>,
   
  
)

{/* <React.StrictMode>
<App />

  </React.StrictMode>, */}



  
  
