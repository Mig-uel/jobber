'use client'

import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobMode,
  JobStatus,
} from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CustomFormField, CustomFormSelect } from './FormComponents'
import { Button } from './ui/button'
import { Form } from './ui/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { addJob } from '@/utils/actions'

export default function AddJobForm() {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      mode: JobMode.FullTime,
      status: JobStatus.Pending,
    },
  })

  const queryClient = useQueryClient()
  const { toast } = useToast()
  const router = useRouter()

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: CreateAndEditJobType) => await addJob(values),

    onSuccess(data) {
      if (!data) {
        toast({
          description: 'There was an error adding the job ⛔',
          variant: 'destructive',
        })
        return
      }

      toast({ description: 'Job successfully added 🎉' })
      queryClient.invalidateQueries({
        queryKey: ['jobs', 'stats', 'charts'],
      })

      return router.push('/jobs')
    },
  })

  const handleSubmit = (values: CreateAndEditJobType) => mutate(values)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='bg-muted p-8 rounded'
      >
        <h2 className='capitalize font-semibold text-4xl mb-6'>Add Job</h2>

        <div className='grid gap-4 md:grid-cols-2  lg:grid-cols-3 items-start'>
          {/* position */}
          <CustomFormField name='position' control={form.control} />

          {/* company */}
          <CustomFormField name='company' control={form.control} />

          {/* location */}
          <CustomFormField name='location' control={form.control} />

          {/* job status */}
          <CustomFormSelect
            name='status'
            label='Job Status'
            items={Object.values(JobStatus)}
            // @ts-expect-error unknown type error
            control={form.control}
          />

          {/* job mode */}
          <CustomFormSelect
            name='mode'
            label='Job Mode'
            items={Object.values(JobMode)}
            // @ts-expect-error unknown type error
            control={form.control}
          />

          <Button
            type='submit'
            className='self-end capitalize'
            disabled={isPending}
          >
            {isPending ? 'Loading' : 'Add Job'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
