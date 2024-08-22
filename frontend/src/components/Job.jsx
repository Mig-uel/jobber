import { Form, Link } from 'react-router-dom'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)
import PropTypes from 'prop-types'

// ui
import { Wrapper } from '../styled/Job'
import JobInfo from './JobInfo'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'

const Job = ({ _id, position, company, location, type, status, createdAt }) => {
  const date = day(createdAt).format('MMM Do, YYYY')

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={location} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={type} />

          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer className='actions'>
          <Link className='btn edit-btn'>Edit</Link>
          <Form>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job

Job.propTypes = {
  _id: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}
