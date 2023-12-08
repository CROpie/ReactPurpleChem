import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import TokenProvider from './contexts/TokenProvider'
import RDKitProvider from './contexts/RDKitProvider/RDKitProvider.jsx'
import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Inventory, { inventoryLoader } from './components/Inventory/Inventory.jsx'
import Order from './components/Order/Order.jsx'
import Query from './components/Query/Query.jsx'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/inventory',
        element: <Inventory />,
        loader: inventoryLoader(queryClient),
      },
      {
        path: '/order',
        element: <Order />,
      },
      {
        path: '/query',
        element: <Query />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        // theme="dark"
        hideProgressBar="true"
        transition={Flip}
      />
      <TokenProvider>
        <RDKitProvider>
          <RouterProvider router={router} />
        </RDKitProvider>
      </TokenProvider>
    </QueryClientProvider>
  </>
)
