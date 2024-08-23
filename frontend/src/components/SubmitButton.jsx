import { useNavigation } from 'react-router-dom'
import PropTypes from 'prop-types'

const SubmitButton = ({ formBtn }) => {
  const navigation = useNavigation()

  // get navigation state from useNavigation hook
  // boolean, true if the navigation state is submitting, false otherwise
  const isSubmitting = navigation.state === 'submitting'

  return (
    <button
      type='submit'
      className={`btn btn-block ${formBtn ? 'form-btn' : ''}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  )
}

export default SubmitButton

SubmitButton.propTypes = {
  formBtn: PropTypes.bool,
}
