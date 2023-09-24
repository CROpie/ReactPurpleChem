import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import TokenProvider from './contexts/TokenProvider'
import RDKitProvider from './contexts/RDKitProvider/RDKitProvider.jsx'
import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer
      position="top-center"
      autoClose={1500}
      // theme="dark"
      hideProgressBar="true"
      transition={Flip}
    />
    <TokenProvider>
      <RDKitProvider>
        <App />
      </RDKitProvider>
    </TokenProvider>
  </>
)
