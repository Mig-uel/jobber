import { NavLink } from 'react-router-dom'
import { useDashboardContext } from '../pages/Dashboard/DashboardLayout'
import { links } from '../utils/links'

const NavLinks = () => {
  const { toggleSidebar } = useDashboardContext()

  return (
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
  )
}

export default NavLinks
