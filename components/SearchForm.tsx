'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { JobStatus } from '@/utils/types'
import { Button } from './ui/button'
import { Label } from './ui/label'

export default function SearchForm() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get('jobStatus') || 'all'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const search = formData.get('search') as string
    const jobStatus = formData.get('jobStatus') as string

    // construct search params
    const params = new URLSearchParams()

    params.set('search', search)
    params.set('jobStatus', jobStatus)

    return router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='bg-muted rounded-lg p-8'>
      <h2 className='text-4xl font-semibold'>Search</h2>

      <form
        className='my-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-end'
        onSubmit={handleSubmit}
      >
        <div>
          <Label htmlFor='search' className='font-semibold'>
            Search Term
          </Label>
          <Input
            id='search'
            type='text'
            placeholder='Search jobs'
            name='search'
            defaultValue={search}
          />
        </div>

        <div>
          <Label htmlFor='jobStatus' className='font-semibold'>
            Job Status
          </Label>

          <Select name='jobStatus' defaultValue={jobStatus}>
            <SelectTrigger id='jobStatus'>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {['all', ...Object.values(JobStatus)].map((jobStatus) => (
                <SelectItem key={jobStatus} value={jobStatus}>
                  {jobStatus}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type='submit'>Search</Button>
      </form>
    </div>
  )
}
