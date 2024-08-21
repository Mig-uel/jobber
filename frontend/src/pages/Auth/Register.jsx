import { Link, Form, useNavigation } from 'react-router-dom'

import { Wrapper } from '../../styled/RegisterAndLogin'
import { Logo, FormRow } from '../../components'

const Register = () => {
  const navigation = useNavigation()

  // boolean, true if the navigation state is submitting, false otherwise
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method='post' className='form'>
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

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

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
