import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

// components
import App from './App.jsx'
import {
  DashboardLayout,
  AddJob,
  Admin,
  DeleteJob,
  EditJob,
  Error,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from './pages'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index path='/' element={<App />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<DashboardLayout />}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
