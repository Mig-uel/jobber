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
  HomeLayout,
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
    <Route path='/' element={<App />}>
      <Route index element={<Landing />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />

      {/* dashboard nested routes */}
      <Route path='dashboard' element={<DashboardLayout />}>
        <Route index element={<AddJob />} />
        <Route path='dashboard/admin' element={<Admin />} />
        <Route path='dashboard/stats' element={<Stats />} />
        <Route path='dashboard/profile' element={<Profile />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
