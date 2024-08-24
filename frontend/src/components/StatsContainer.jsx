import StatItem from './StatItem'
import { Wrapper } from '../styled/StatsContainer'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import PropTypes from 'prop-types'

const StatsContainer = ({ stats }) => {
  const Stats = [
    {
      title: 'pending',
      count: stats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'interview',
      count: stats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'declined',
      count: stats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]

  return (
    <Wrapper>
      {Stats.map((s) => {
        return <StatItem key={s.title} {...s} />
      })}
    </Wrapper>
  )
}

export default StatsContainer

StatsContainer.propTypes = {
  stats: PropTypes.object.isRequired,
}
