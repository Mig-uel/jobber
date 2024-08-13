import { Link, useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  console.log(error)

  return (
    <div>
      {error.status} {error.statusText} <Link to='/'>Go Back to Dashboard</Link>
    </div>
  )
}

export default Error
