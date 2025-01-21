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

export default function SearchForm() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const job = Object.fromEntries(formData)

    console.log(job)
  }

  return (
    <form
      className='bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg'
      onSubmit={handleSubmit}
    >
      <Input type='text' placeholder='Search jobs' name='search' />

      <Select name='jobStatus' defaultValue='all'>
        <SelectTrigger>
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

      <Button type='submit'>Search</Button>
    </form>
  )
}
