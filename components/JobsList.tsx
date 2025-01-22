'use client'
import { getAllJobs } from '@/utils/actions'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import ComplexPaginationContainer from './ComplexPaginationContainer'
import JobCard from './JobCard'

export default function JobsList() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get('jobStatus') || 'all'
  const pageNumber = Number(searchParams.get('page')) || 1

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search, jobStatus, pageNumber],

    queryFn: () =>
      getAllJobs({
        jobStatus,
        page: pageNumber,
        search,
      }),
  })

  const jobs = data?.jobs || []
  const count = data?.count || 0
  const page = data?.page || 0
  const totalPages = data?.totalPages || 0

  if (isPending) return <h2 className='text-xl mt-8'>Loading jobs...</h2>

  if (!jobs.length) return <h2 className='text-xl mt-8'>No jobs found 😖</h2>

  return (
    <>
      {/* pagination container */}
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-semibold capitalize mt-8'>
          {count} jobs found
        </h2>

        {totalPages < 2 ? null : (
          <ComplexPaginationContainer
            currentPage={page}
            totalPages={totalPages}
          />
        )}
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}
