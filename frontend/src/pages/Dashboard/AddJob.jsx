import { Form, useNavigation, useOutletContext } from 'react-router-dom'
import { STATUS, TYPE } from '../../../../utils/constants.utils'

// ui
import { FormRow, FormRowSelect } from '../../components'
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

          <FormRowSelect
            labelText='Job Status'
            name='status'
            defaultValue={STATUS.PENDING}
            list={Object.values(STATUS)}
          />

          <FormRowSelect
            labelText='Job Type'
            name='type'
            defaultValue={TYPE.FULL_TIME}
            list={Object.values(TYPE)}
          />

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
