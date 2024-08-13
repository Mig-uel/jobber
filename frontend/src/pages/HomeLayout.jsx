// prop types
import PropTypes from 'prop-types'

const HomeLayout = ({ children }) => {
  return (
    <>
      <h1>Jobber</h1>
      {children}
    </>
  )
}

export default HomeLayout

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
