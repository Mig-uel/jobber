import { Form, Link, useNavigate } from 'react-router-dom'

import { Wrapper } from '../../styled/RegisterAndLogin'
import { Logo, FormRow, SubmitButton } from '../../components'
import { customFetch } from '../../utils/fetch.utils'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()

  const loginDemoUser = async () => {
    try {
      const data = { email: 'demo@email.com', password: 'johndoe123' }

      await customFetch.post('/auth/login', data)

      toast.success(`Take a test drive`)
      return navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <Wrapper>
      <Form className='form' method='post'>
        <Logo />
        <h4>Login</h4>

        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />

        <SubmitButton />

        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
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
