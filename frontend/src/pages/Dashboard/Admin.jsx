import { useLoaderData } from 'react-router-dom'
import { Wrapper } from '../../styled/StatsContainer'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
import { StatItem } from '../../components'

const Admin = () => {
  const { users, jobs } = useLoaderData()

  return (
    <Wrapper>
      <StatItem
        title='Users'
        count={users}
        color='#e9b949'
        bcg='#fcec7e'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='Jobs'
        count={jobs}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  )
}

export default Admin
