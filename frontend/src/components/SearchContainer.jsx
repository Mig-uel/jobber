import { Form, Link, useSubmit } from 'react-router-dom'
import { useAllJobsContext } from '../pages/Dashboard/AllJobs'
import { SORT_BY, STATUS, TYPE } from '../../../utils/constants.utils'
import { FormRow, FormRowSelect, SubmitButton } from '.'
import { Wrapper } from '../styled/DashboardFormPage'

const SearchContainer = () => {
  const data = useAllJobsContext()
  const submit = useSubmit()

  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>Search Form</h5>
        <div className='form-center'>
          <FormRow
            type='search'
            name='search'
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowSelect
            labelText='Job Status'
            name='status'
            list={['all', ...Object.values(STATUS)]}
            defaultValue='all'
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowSelect
            labelText='Job Type'
            name='type'
            list={['all', ...Object.values(TYPE)]}
            defaultValue='all'
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowSelect
            name='sort'
            defaultValue='newest'
            list={[...Object.values(SORT_BY)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <Link to='/dashboard/jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer
