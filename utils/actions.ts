'use server'

import prisma from './db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobStatus,
  JobType,
} from './types'
import { Prisma } from '@prisma/client'

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
