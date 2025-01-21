import { useToast } from '@/hooks/use-toast'
import { deleteJob } from '@/utils/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'

export default function DeleteJobButton({ id }: { id: string }) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { isPending, mutate } = useMutation({
    mutationFn: (id: string) => deleteJob(id),

    onSuccess(data) {
      if (!data) {
        toast({
          description: 'There was an error deleting the job ⛔',
          variant: 'destructive',
        })
        return
      }

      queryClient.invalidateQueries({
        queryKey: ['jobs'],
      })
      queryClient.invalidateQueries({
        queryKey: ['stats'],
      })
      queryClient.invalidateQueries({
        queryKey: ['charts'],
      })

      toast({ description: 'Job successfully deleted 🎉' })
    },
  })

  const handleClick = () => mutate(id)

  return (
    <Button
      type='submit'
      variant='destructive'
      disabled={isPending}
      onClick={handleClick}
      size='sm'
    >
      Delete
    </Button>
  )
}
