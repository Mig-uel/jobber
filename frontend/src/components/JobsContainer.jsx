import { useAllJobsContext } from '../pages/Dashboard/AllJobs'

import Job from './Job'
import { Wrapper } from '../styled/JobsContainer'

const JobsContainer = () => {
  const jobs = useAllJobsContext()

  if (!jobs.length)
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )

  return (
    <Wrapper>
      <div className='jobs'>
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
    </Wrapper>
  )
}

export default JobsContainer
