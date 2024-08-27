import { useAllJobsContext } from '../pages/Dashboard/AllJobs'

// ui
import { Wrapper } from '../styled/PageButtonContainer'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'

const PageButtonContainer = () => {
  const { numOfPages, currentPage } = useAllJobsContext()

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  return (
    <Wrapper>
      <button className='btn prev-btn'>
        <HiChevronDoubleLeft /> Prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn page-btn ${
              pageNumber === currentPage ? 'active' : ''
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button className='btn next-btn'>
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageButtonContainer
