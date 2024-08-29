import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
import ErrorElement from './components/ErrorElement'

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}

checkDefaultTheme()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<Error />}>
      <Route index element={<Landing />} />
      <Route path='register' element={<Register />} action={registerAction} />
      <Route
        path='login'
        element={<Login />}
        action={loginAction(queryClient)}
      />

      {/* dashboard nested routes */}
      <Route
        path='dashboard'
        element={<DashboardLayout queryClient={queryClient} />}
        loader={() => dashboardLoader(queryClient)}
        errorElement={<ErrorElement />}
      >
        <Route index element={<AddJob />} action={addJobAction} />
        <Route path='jobs' element={<AllJobs />} loader={jobsLoader} />
        <Route path='admin' element={<Admin />} loader={adminLoader} />
        <Route
          path='stats'
          element={<Stats />}
          loader={() => statsLoader(queryClient)}
          errorElement={<ErrorElement />}
        />
        <Route
          path='profile'
          element={<Profile />}
          action={updateUserAction(queryClient)}
        />
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer position='top-center' />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
