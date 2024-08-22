import PropTypes from 'prop-types'

const FormRowSelect = ({ name, labelText, list, defaultValue = '' }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className='form-select'
        defaultValue={defaultValue}
      >
        {list.map((status, index) => (
          <option key={index}>{status}</option>
        ))}
      </select>
    </div>
  )
}

export default FormRowSelect

FormRowSelect.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  list: PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
}
