import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditJob = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  console.log(state)

  useEffect(() => {
    const error = new Error('Invalid state or ID!')
    error.status = 404

    if (!state) throw error
  }, [navigate, state])

  return (
    <>
      <h1>Edit Job</h1>

      <input type='text' defaultValue={state?.company} />
    </>
  )
}

export default EditJob
