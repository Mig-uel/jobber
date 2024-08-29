import { createContext, useContext } from 'react'
import { useLoaderData } from 'react-router-dom'

// ui
import { JobsContainer, SearchContainer } from '../../components'
import { useQuery } from '@tanstack/react-query'
import { allJobsQuery } from '../../loaders/jobs.loader'

const AllJobsContext = createContext()

const AllJobs = () => {
  const { searchValues } = useLoaderData()
  
  const {
    data: { jobs, currentPage, numOfPages, totalJobs },
  } = useQuery(allJobsQuery(searchValues))

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
