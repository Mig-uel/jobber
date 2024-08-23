import { Form, Link } from 'react-router-dom'

import { Wrapper } from '../../styled/RegisterAndLogin'
import { Logo, FormRow, SubmitButton } from '../../components'

const Login = () => {
  return (
    <Wrapper>
      <Form className='form' method='post'>
        <Logo />
        <h4>Login</h4>

        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />

        <SubmitButton />

        <button type='button' className='btn btn-block'>
          Explore the App
        </button>

        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
