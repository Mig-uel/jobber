import { Form, useNavigation, useOutletContext } from 'react-router-dom'
import { FormRow } from '../../components'
import { Wrapper } from '../../styled/DashboardFormPage'

const Profile = () => {
  const {
    user: { firstName, lastName, email, location },
  } = useOutletContext()

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method='patch' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>Profile</h4>
        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='avatar' className='form-label'>
              Select an image file (max 0.5MB)
            </label>
            <input
              type='file'
              name='avatar'
              id='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>

          <FormRow
            type='text'
            name='firstName'
            defaultValue={firstName}
            labelText='First Name'
          />

          <FormRow
            type='text'
            name='lastName'
            defaultValue={lastName}
            labelText='Last Name'
          />

          <FormRow type='text' name='email' defaultValue={email} />

          <FormRow type='text' name='location' defaultValue={location} />

          <button
            type='submit'
            className='btn btn-block form-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile
