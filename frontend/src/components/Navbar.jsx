import { useDashboardContext } from '../pages/Dashboard/DashboardLayout'
import { Wrapper } from '../styled/Navbar'
import LogoutContainer from './LogoutContainer'
import { FaAlignLeft } from 'react-icons/fa'
import Logo from './Logo'

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext()

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>Dashboard</h4>
        </div>
        <div className='btn-container'>
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
