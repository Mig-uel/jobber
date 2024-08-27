import { useAllJobsContext } from '../pages/Dashboard/AllJobs'

import Job from './Job'
import { Wrapper } from '../styled/JobsContainer'
import { Link } from 'react-router-dom'
import PageButtonContainer from './PageButtonContainer'

const JobsContainer = () => {
  const { jobs, numOfPages, totalJobs } = useAllJobsContext()

  if (!jobs.length)
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
        <Link to='..'>
          <h4>Add a job</h4>
        </Link>
      </Wrapper>
    )

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'}
      </h5>
      <div className='jobs'>
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <PageButtonContainer />}
    </Wrapper>
  )
}

export default JobsContainer
