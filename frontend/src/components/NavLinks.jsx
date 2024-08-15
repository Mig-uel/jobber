import { NavLink } from 'react-router-dom'
import { useDashboardContext } from '../pages/Dashboard/DashboardLayout'
import { links } from '../utils/links'
import PropTypes from 'prop-types'

const NavLinks = ({ isDesktopSidebar }) => {
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
            onClick={isDesktopSidebar ? null : toggleSidebar}
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

NavLinks.propTypes = {
  isDesktopSidebar: PropTypes.bool,
}
