import { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Wrapper } from '../../styled/Dashboard'
import { DesktopSidebar, MobileSidebar, Navbar } from '../../components'

// context
const DashboardContext = createContext()

const DashboardLayout = () => {
  const user = { name: 'John' }
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  // handlers
  const toggleDarkTheme = () => console.log('toggle dark theme')
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
