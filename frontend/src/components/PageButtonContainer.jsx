import { useLocation, useNavigate } from 'react-router-dom'
import { useAllJobsContext } from '../pages/Dashboard/AllJobs'

// ui
import { Wrapper } from '../styled/PageButtonContainer'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'

const PageButtonContainer = () => {
  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  const { numOfPages, currentPage } = useAllJobsContext()

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)

    searchParams.set('page', pageNumber)

    navigate(`${pathname}?${searchParams.toString()}`)
  }

  return (
    <Wrapper>
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1

          if (prevPage < 1) prevPage = 1

          handlePageChange(prevPage)
        }}
      >
        <HiChevronDoubleLeft /> Prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn page-btn ${
              pageNumber === currentPage ? 'active' : ''
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1

          if (nextPage > numOfPages) nextPage = numOfPages

          handlePageChange(nextPage)
        }}
      >
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageButtonContainer
