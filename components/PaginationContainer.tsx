'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'

type PaginationContainerProps = {
  currentPage: number
  totalPages: number
}

export default function PaginationContainer({
  currentPage,
  totalPages,
}: PaginationContainerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get('search') || '',
      jobStatus: searchParams.get('jobStatus') || '',
      page: String(page),
    }

    const params = new URLSearchParams(defaultParams)

    return router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex gap-x-2'>
      {paginationButtons.map((page) => (
        <Button
          onClick={() => handlePageChange(page)}
          key={page}
          size='icon'
          variant={currentPage === page ? 'default' : 'outline'}
        >
          {page}
        </Button>
      ))}
    </div>
  )
}
