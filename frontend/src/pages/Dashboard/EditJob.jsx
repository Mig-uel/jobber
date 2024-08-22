import { useEffect } from 'react'
import {
  Form,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from 'react-router-dom'
import { STATUS, TYPE } from '../../../../utils/constants.utils'

// ui
import { Wrapper } from '../../styled/DashboardFormPage'
import { FormRow, FormRowSelect } from '../../components'

const EditJob = () => {
  let { id } = useParams()
  const { state } = useLocation()
  const error = useActionData()

  const navigate = useNavigate()
  const navigation = useNavigation()

  const isSubmitting = navigation.state === 'submitting'

  useEffect(() => {
    if (!state) {
      return navigate(`/dashboard/jobs`)
    }

    if (state && error) {
      return navigate(`/dashboard/edit/${id}`, { state })
    }
  }, [navigate, state, id, error])

  return (
    <Wrapper>
      <Form method='patch' className='form'>
        <h4 className='form-title'>Edit Job Posting</h4>

        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={state?.position} />
          <FormRow type='text' name='company' defaultValue={state?.company} />
          <FormRow type='text' name='location' defaultValue={state?.location} />
          <FormRowSelect
            name='status'
            labelText='Job Status'
            defaultValue={state?.status}
            list={Object.values(STATUS)}
          />
          <FormRowSelect
            name='type'
            labelText='Job Type'
            defaultValue={state?.type}
            list={Object.values(TYPE)}
          />

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

export default EditJob
