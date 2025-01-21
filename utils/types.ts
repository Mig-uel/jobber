import * as zod from 'zod'

export type JobType = {
  id: string
  createdAt: Date
  updatedAt: Date
  clerkId: string
  position: string
  company: string
  location: string
  status: string
  mode: string
}

export enum JobStatus {
  Pending = 'pending',
  Interview = 'interview',
  Declined = 'declined',
}

export enum JobMode {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Internship = 'internship',
}

export const createAndEditJobSchema = zod.object({
  position: zod.string().min(2, {
    message: 'Position must be at least 2 characters.',
  }),

  company: zod.string().min(2, {
    message: 'Company must be at least 2 characters.',
  }),

  location: zod.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),

  status: zod.nativeEnum(JobStatus),

  mode: zod.nativeEnum(JobMode),
})

export type CreateAndEditJobType = zod.infer<typeof createAndEditJobSchema>
