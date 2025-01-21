'use server'

import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'
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

    const jobs: JobType[] = await prisma.job.findMany({
      where,

      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      jobs,
      count: 0,
      page: 1,
      totalPages: 0,
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
