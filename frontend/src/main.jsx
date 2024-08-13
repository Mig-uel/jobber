import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import App from './App.jsx'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(<Route index path='/' element={<App />}></Route>)
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
