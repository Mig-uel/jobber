import { Outlet } from 'react-router-dom'

// components
import HomeLayout from './pages/HomeLayout'

const App = () => {
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  )
}

export default App
