import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

// actions
import {
  addJobAction,
  editJobAction,
  loginAction,
  registerAction,
  updateUserAction,
} from './actions'

// loaders
import {
  adminLoader,
  dashboardLoader,
  jobsLoader,
  statsLoader,
} from './loaders'

import deleteJobLoader from './loaders/deletejob.loader'

// components
import App from './App.jsx'
import {
  DashboardLayout,
  AllJobs,
  AddJob,
  Admin,
  Error,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
  EditJob,
  DeleteJob,
} from './pages'

// toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      <Route path='register' element={<Register />} action={registerAction} />
      <Route path='login' element={<Login />} action={loginAction} />

      {/* dashboard nested routes */}
      <Route
        path='dashboard'
        element={<DashboardLayout />}
        loader={dashboardLoader}
      >
        <Route index element={<AddJob />} action={addJobAction} />
        <Route path='jobs' element={<AllJobs />} loader={jobsLoader} />
        <Route path='admin' element={<Admin />} loader={adminLoader} />
        <Route path='stats' element={<Stats />} loader={statsLoader} />
        <Route path='profile' element={<Profile />} action={updateUserAction} />
        <Route path='edit/:id' element={<EditJob />} action={editJobAction} />
        <Route
          path='delete/:id'
          element={<DeleteJob />}
          loader={deleteJobLoader}
        />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position='top-center' />
  </StrictMode>
)
