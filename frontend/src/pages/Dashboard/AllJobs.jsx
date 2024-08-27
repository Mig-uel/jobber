import { createContext, useContext } from 'react'
import { useLoaderData } from 'react-router-dom'

// ui
import { JobsContainer, SearchContainer } from '../../components'

const AllJobsContext = createContext()

const AllJobs = () => {
  const {
    data: { jobs, currentPage, numOfPages, totalJobs },
    searchValues,
  } = useLoaderData()

  return (
    <AllJobsContext.Provider
      value={{ jobs, currentPage, numOfPages, totalJobs, searchValues }}
    >
      <SearchContainer></SearchContainer>
      <JobsContainer></JobsContainer>
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)

export default AllJobs
