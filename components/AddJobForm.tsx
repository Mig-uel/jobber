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

  function handleSubmit(values: CreateAndEditJobType) {
    console.log(values)
  }

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

          <Button type='submit' className='self-end capitalize'>
            Add Job
          </Button>
        </div>
      </form>
    </Form>
  )
}
