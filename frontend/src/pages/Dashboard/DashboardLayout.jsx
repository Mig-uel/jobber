import { createContext, useContext, useState, useRef } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import { DesktopSidebar, MobileSidebar, Navbar } from '../../components'
import { checkDefaultTheme } from '../../main'
import { Wrapper } from '../../styled/Dashboard'

// context
const DashboardContext = createContext()

const DashboardLayout = () => {
  const { user } = useLoaderData()
  console.log(user)

  // const user = { name: 'John' }
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
  const logoutUser = () => console.log('logged out')

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
              <Outlet />
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
