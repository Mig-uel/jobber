import { Form, useNavigation, useOutletContext } from 'react-router-dom'
import { customFetch } from '../../utils/fetch.utils'
import { STATUS } from '../../../../utils/constants.utils'

// ui
import { toast } from 'react-toastify'
import { FormRow } from '../../components'
import { Wrapper } from '../../styled/DashboardFormPage'

const AddJob = () => {
  const { user } = useOutletContext()
  const navigation = useNavigation()

  // get navigation state from useNavigation hook
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Add Job</h4>

        <div className='form-center'>
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            name='location'
            defaultValue={user?.location || ''}
          />

          <div className='form-row'>
            <label htmlFor='status' className='form-label'>
              Job Status
            </label>
            <select
              name='status'
              id='status'
              className='form-select'
              defaultValue={STATUS.PENDING}
            >
              {Object.values(STATUS).map((status, index) => (
                <option key={index}>{status}</option>
              ))}
            </select>
          </div>

          <button
            type='submit'
            className='btn btn-block form-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Job'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob
