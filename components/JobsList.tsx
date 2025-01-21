'use client'

import { getAllJobs } from '@/utils/actions'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import JobCard from './JobCard'

export default function JobsList() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get('jobStatus') || 'all'
  const pageNumber = Number(searchParams.get('pageNumber')) || 1

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

  if (isPending) return <h2 className='text-xl mt-8'>Loading jobs...</h2>

  if (!jobs.length) return <h2 className='text-xl mt-8'>No jobs found :(</h2>

  return (
    <>
      {/* button container */}
      <div className='grid md:grid-cols-2 gap-8 mt-8'>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}
