'use client'

import { useToast } from '@/hooks/use-toast'
import { getSingleJob, updateJob } from '@/utils/actions'
import {
  createAndEditJobSchema,
  type CreateAndEditJobType,
  JobMode,
  JobStatus,
} from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CustomFormField, CustomFormSelect } from './FormComponents'
import { Button } from './ui/button'
import { Form } from './ui/form'

export default function EditJobForm({ jobId }: { jobId: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['job', jobId],

    queryFn: () => getSingleJob(jobId),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => updateJob(jobId, values),

    onSuccess(data) {
      if (!data) {
        toast({
          description: 'Job could not be updated, please try again 😖',
          variant: 'destructive',
        })

        return
      }

      toast({ description: 'Job was successfully updated 🎉' })

      queryClient.invalidateQueries({
        queryKey: ['jobs'],
      })
      queryClient.invalidateQueries({
        queryKey: ['job', jobId],
      })
      queryClient.invalidateQueries({
        queryKey: ['stats'],
      })

      return router.push('/jobs')
    },
  })

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location || '',
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  })

  const handleSubmit = (values: CreateAndEditJobType) => mutate(values)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='bg-muted p-8 rounded'
      >
        <h2 className='capitalize font-semibold text-4xl mb-6'>Edit Job</h2>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-end'>
          {/* position */}
          <CustomFormField control={form.control} name='position' />

          {/* company */}
          <CustomFormField control={form.control} name='company' />

          {/* location */}
          <CustomFormField control={form.control} name='location' />

          {/* job status */}
          <CustomFormSelect
            name='status'
            label='Job Status'
            items={Object.values(JobStatus)}
            // @ts-expect-error unknown type error
            control={form.control}
          />

          {/* job type */}
          <CustomFormSelect
            name='mode'
            label='Job Mode'
            // @ts-expect-error unknown type error
            control={form.control}
            items={Object.values(JobMode)}
          />

          <Button>{isPending ? 'Updating...' : 'Update'}</Button>
        </div>
      </form>
    </Form>
  )
}
