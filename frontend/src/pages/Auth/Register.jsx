import { Link } from 'react-router-dom'

import { Wrapper } from '../../styled/RegisterAndLogin'
import { Logo, FormRow } from '../../components'

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Register</h4>

        <FormRow
          type='text'
          name='firstName'
          defaultValue='John'
          labelText='First Name'
        />
        <FormRow
          type='text'
          name='lastName'
          defaultValue='Smith'
          labelText='Last Name'
        />
        <FormRow type='text' name='location' defaultValue='Brooklyn' />
        <FormRow type='email' name='email' defaultValue='john@email.com' />
        <FormRow type='password' name='password' defaultValue='123456' />

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
