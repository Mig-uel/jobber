import { useLocation, useNavigate } from 'react-router-dom'
import { useAllJobsContext } from '../pages/Dashboard/AllJobs'

// ui
import { Wrapper } from '../styled/PageButtonContainer'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'

const PageButtonContainer = () => {
  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  const { numOfPages, currentPage } = useAllJobsContext()

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)

    searchParams.set('page', pageNumber)

    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`btn page-btn ${activeClass ? 'active' : ''}`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []

    // first page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    )

    // dots
    if (currentPage > 3)
      pageButtons.push(
        <span className='btn page-btn dots' key='dots-1'>
          ...
        </span>
      )

    // one before current page
    if (currentPage !== 1 && currentPage !== 2)
      pageButtons.push(
        addPageButton({ pageNumber: currentPage - 1, activeClass: false })
      )

    // current page
    if (currentPage !== 1 && currentPage !== numOfPages)
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      )

    // one after current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1)
      pageButtons.push(
        addPageButton({ pageNumber: currentPage + 1, activeClass: false })
      )

    // dots
    if (currentPage < numOfPages - 2)
      pageButtons.push(
        <span className='btn page-btn dots' key='dots+2'>
          ...
        </span>
      )

    // last page
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    )

    return pageButtons
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
      <div className='btn-container'>{renderPageButtons()}</div>
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
