import { createContext, useContext } from 'react'
import { useLoaderData } from 'react-router-dom'

// ui
import { JobsContainer, SearchContainer } from '../../components'

const AllJobsContext = createContext()

const AllJobs = () => {
  const {
    data: { jobs },
    searchValues,
  } = useLoaderData()

  return (
    <AllJobsContext.Provider value={{ jobs, searchValues }}>
      <SearchContainer></SearchContainer>
      <JobsContainer></JobsContainer>
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)

export default AllJobs
