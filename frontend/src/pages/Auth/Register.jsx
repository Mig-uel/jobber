import { Link, Form } from 'react-router-dom'

import { Wrapper } from '../../styled/RegisterAndLogin'
import { Logo, FormRow, SubmitButton } from '../../components'

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>

        <FormRow type='text' name='firstName' labelText='First Name' />
        <FormRow type='text' name='lastName' labelText='Last Name' />
        <FormRow type='text' name='location' />
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />

        <SubmitButton />

        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
