import { useDashboardContext } from '../pages/Dashboard/DashboardLayout'
import { Wrapper } from '../styled/DesktopSidebar'
import { Logo, NavLinks } from '.'

const DesktopSidebar = () => {
  const { showSidebar } = useDashboardContext()

  return (
    <Wrapper>
      <div className={`sidebar-container ${!showSidebar && 'show-sidebar'}`}>
        <div className='content'>
          <header>
            <Logo />
          </header>
          {/* boolean props can be passed without value */}
          <NavLinks isDesktopSidebar />
        </div>
      </div>
    </Wrapper>
  )
}

export default DesktopSidebar
