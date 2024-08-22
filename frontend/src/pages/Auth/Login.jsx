import { Form, Link, useNavigation } from 'react-router-dom'

import { Wrapper } from '../../styled/RegisterAndLogin'
import { Logo, FormRow } from '../../components'

const Login = () => {
  const navigation = useNavigation()

  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form className='form' method='post'>
        <Logo />
        <h4>Login</h4>

        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

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
