import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Wrapper } from '../../styled/Dashboard'
import { DesktopSidebar, MobileSidebar, Navbar } from '../../components'

const DashboardLayout = () => {
  const user = { name: 'John' }
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  // handlers
  const toggleDarkThemeHandler = () => {
    console.log('toggle dark theme')
  }

  const toggleSidebarHandler = () => setToggleSidebar((prev) => !prev)

  return (
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
  )
}

export default DashboardLayout
