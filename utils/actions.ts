'use server'

import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { redirect } from 'next/navigation'
import prisma from './db'
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from './types'

/** Authenticate or Redirect */
function authenticateOrRedirect(): string {
  const { userId } = auth()

  if (!userId) redirect('/')

  return userId
}

/** Add Job Action  */
export async function addJob(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const clerkId = authenticateOrRedirect()

  try {
    createAndEditJobSchema.parse(values)

    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId,
      },
    })

    return job
  } catch (error) {
    if (error instanceof Error) console.log(error.message)

    return null
  }
}

type GetAllJobsActionProps = {
  search?: string
  jobStatus?: string
  page?: number
  limit?: number
}

/** Get All Jobs */
export async function getAllJobs({
  jobStatus = 'all',
  limit = 10,
  page = 1,
  search = '',
}: GetAllJobsActionProps): Promise<{
  jobs: JobType[]
  count: number
  page: number
  totalPages: number
}> {
  const clerkId = authenticateOrRedirect()

  try {
    // prisma where clause
    let where: Prisma.JobWhereInput = {
      clerkId,
    }

    // if search term is provided
    if (search)
      where = {
        ...where,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      }

    // if jobStatus is provided and is not the default 'all' value
    if (jobStatus && jobStatus !== 'all')
      where = {
        ...where,

        status: jobStatus,
      }

    const skip = (page - 1) * limit
    const jobs: JobType[] = await prisma.job.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const count: number = await prisma.job.count({
      where,
    })

    const totalPages = Math.ceil(count / limit)

    return {
      jobs,
      count,
      page: 1,
      totalPages,
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message)

    return {
      jobs: [],
      count: 0,
      page: 1,
      totalPages: 0,
    }
  }
}

/** Delete Job */
export async function deleteJob(id: string): Promise<JobType | null> {
  const clerkId = authenticateOrRedirect()

  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id,
        clerkId,
      },
    })

    return job
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
    return null
  }
}

/** Get Single Job */
export async function getSingleJob(id: string): Promise<JobType | null> {
  let job: JobType | null = null
  const clerkId = authenticateOrRedirect()

  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId,
      },
    })
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
    job = null
  }

  if (!job) redirect('/jobs')

  return job
}

/** Update Job */
export async function updateJob(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const clerkId = authenticateOrRedirect()

  try {
    createAndEditJobSchema.parse(values)

    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId,
      },
      data: {
        ...values,
      },
    })

    return job
  } catch (error) {
    if (error instanceof Error) console.log(error.message)

    return null
  }
}

/** Get Stats */
export async function getStats(): Promise<{
  pending: number
  interview: number
  declined: number
}> {
  const clerkId = authenticateOrRedirect()

  try {
    const stats = await prisma.job.groupBy({
      where: {
        clerkId,
      },

      by: ['status'],

      _count: {
        status: true,
      },
    })

    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status
      return acc
    }, {} as Record<string, number>)

    const defaultStats = {
      pending: 0,
      declined: 0,
      interview: 0,
      ...statsObject,
    }

    return defaultStats
  } catch (error) {
    if (error instanceof Error) console.log(error.message)

    return redirect('/jobs')
  }
}

/** Get Chart Data */
export async function getChartData(): Promise<
  Array<{
    date: string
    count: number
  }>
> {
  const clerkId = authenticateOrRedirect()
  const sixMonthsAgo = dayjs().subtract(6, 'month').toDate()

  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },

      orderBy: {
        createdAt: 'asc',
      },
    })

    const applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY')

      const existingEntry = acc.find((entry) => entry.date === date)

      if (existingEntry) existingEntry.count += 1
      else acc.push({ date, count: 1 })

      return acc
    }, [] as Array<{ date: string; count: number }>)

    return applicationsPerMonth
  } catch (error) {
    if (error instanceof Error) console.log(error.message)

    return redirect('/jobs')
  }
}
