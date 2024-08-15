import { useDashboardContext } from '../pages/Dashboard/DashboardLayout'
import { Wrapper } from '../styled/MobileSidebar'

const SmallSidebar = () => {
  const data = useDashboardContext()
  console.log(data)

  return <Wrapper></Wrapper>
}

export default SmallSidebar
