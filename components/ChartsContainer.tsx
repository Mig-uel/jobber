'use client'

import { getChartData } from '@/utils/actions'
import { useQuery } from '@tanstack/react-query'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function ChartsContainer() {
  const { data } = useQuery({
    queryKey: ['charts'],

    queryFn: () => getChartData(),
  })

  if (!data || !data.length) return null

  return (
    <section className='mt-16'>
      <h1 className='text-4xl font-semibold text-center'>
        Monthly Applications
      </h1>

      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='count' fill='#2563EB' barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
