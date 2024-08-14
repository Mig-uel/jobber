import { Link } from 'react-router-dom'

import { Wrapper } from '../../styled/RegisterAndLogin'
import { Logo } from '../../components'

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Register</h4>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='form-input'
            defaultValue='John'
            required
          />
        </div>
        <button type='submit' className='btn btn-block'>
          Register
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
