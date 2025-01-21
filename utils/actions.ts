'use server'

import prisma from './db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from './types'

function authenticateOrRedirect(): string {
  const { userId } = auth()

  if (!userId) redirect('/')

  return userId
}

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
