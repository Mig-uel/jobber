'use client'

import { getStats } from '@/utils/actions'
import { useQuery } from '@tanstack/react-query'
import StatsCard from './StatsCard'

export default function StatsContainer() {
  const { data } = useQuery({
    queryKey: ['stats'],

    queryFn: () => getStats(),
  })

  return (
    <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
      <StatsCard title='pending jobs' value={data?.pending || 0} />
      <StatsCard title='interviews' value={data?.interview || 0} />
      <StatsCard title='declined jobs' value={data?.declined || 0} />
    </div>
  )
}
