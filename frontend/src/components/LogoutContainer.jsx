import { useState } from 'react'
import { useDashboardContext } from '../pages/Dashboard/DashboardLayout'
import { Wrapper } from '../styled/LogoutContainer'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false)
  const { user, logoutUser } = useDashboardContext()

  return (
    <Wrapper>
      <button
        type='button'
        className='btn logout-btn'
        onClick={() => setShowLogout((prev) => !prev)}
      >
        <FaUserCircle /> {user?.firstName} <FaCaretDown />
      </button>

      <div className={`dropdown ${showLogout && 'show-dropdown'}`}>
        <button
          type='button'
          className='dropdown-btn'
          onClick={(logoutUser, () => setShowLogout((prev) => !prev))}
        >
          logout
        </button>
      </div>
    </Wrapper>
  )
}

export default LogoutContainer
