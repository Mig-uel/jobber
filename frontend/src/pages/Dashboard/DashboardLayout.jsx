import { createContext, useContext, useState, useRef } from 'react'
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import {
  DesktopSidebar,
  Loading,
  MobileSidebar,
  Navbar,
} from '../../components'
import { checkDefaultTheme } from '../../main'
import { Wrapper } from '../../styled/Dashboard'
import { customFetch } from '../../utils/fetch.utils'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { userQuery } from '../../loaders/dashboard.loader'

// context
const DashboardContext = createContext()

const DashboardLayout = ({ queryClient }) => {
  const {
    data: { user },
  } = useQuery(userQuery)
  const navigate = useNavigate()

  // loading
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'

  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())
  const bodyRef = useRef(document.body.classList)

  // handlers
  const toggleDarkTheme = () => {
    setIsDarkTheme((prev) => !prev)
    bodyRef.current.toggle('dark-theme', !isDarkTheme)
    localStorage.setItem('darkTheme', !isDarkTheme)
  }

  const toggleSidebar = () => setShowSidebar((prev) => !prev)

  const logoutUser = async () => {
    navigate('/', { replace: true })
    await customFetch('/auth/logout')
    toast.success('Goodbye! 👋')
  }

  // context value
  const value = {
    user,
    showSidebar,
    isDarkTheme,
    toggleDarkTheme,
    toggleSidebar,
    logoutUser,
  }

  return (
    <DashboardContext.Provider value={value}>
      <Wrapper>
        <main className='dashboard'>
          <MobileSidebar />
          <DesktopSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

// custom context hook
export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
