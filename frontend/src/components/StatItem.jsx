import { Wrapper } from '../styled/StatItem'
import PropTypes from 'prop-types'

const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper props={{ color, bcg }}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  )
}

export default StatItem

StatItem.propTypes = {
  count: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.node,
  color: PropTypes.string,
  bcg: PropTypes.string,
}
