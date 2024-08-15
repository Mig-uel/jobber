import { createContext, useContext, useState, useRef, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Wrapper } from '../../styled/Dashboard'
import { DesktopSidebar, MobileSidebar, Navbar } from '../../components'
import PropTypes from 'prop-types'

// context
const DashboardContext = createContext()

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const user = { name: 'John' }
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)
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

DashboardLayout.propTypes = {
  isDarkThemeEnabled: PropTypes.bool,
}
