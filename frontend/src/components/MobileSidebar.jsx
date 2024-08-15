import { useDashboardContext } from '../pages/Dashboard/DashboardLayout'
import { Wrapper } from '../styled/MobileSidebar'
import { links } from '../utils/links'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import { NavLink } from 'react-router-dom'

const MobileSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext()

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar && 'show-sidebar'}`}>
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
            {links.map((link) => {
              const { path, text, icon } = link
              return (
                <NavLink
                  to={path}
                  key={text}
                  className='nav-link'
                  onClick={toggleSidebar}
                  end
                >
                  <span className='icon'>{icon}</span> {text}
                </NavLink>
              )
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default MobileSidebar
