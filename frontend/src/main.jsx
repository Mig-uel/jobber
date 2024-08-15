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
  AllJobs,
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

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}

checkDefaultTheme()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<Error />}>
      <Route index element={<Landing />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />

      {/* dashboard nested routes */}
      <Route path='dashboard' element={<DashboardLayout />}>
        <Route index element={<AddJob />} />
        <Route path='jobs' element={<AllJobs />} />
        <Route path='admin' element={<Admin />} />
        <Route path='stats' element={<Stats />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
