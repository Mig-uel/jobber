import { Outlet } from 'react-router-dom'
import { Wrapper } from '../../styled/Dashboard'
import { DesktopSidebar, MobileSidebar, Navbar } from '../../components'

const DashboardLayout = () => {
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
