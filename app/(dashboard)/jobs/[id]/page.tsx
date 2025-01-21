import { EditJobForm } from '@/components/index'
import { getSingleJob } from '@/utils/actions'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['job', id],
    queryFn: () => getSingleJob(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={id} />
    </HydrationBoundary>
  )
}
