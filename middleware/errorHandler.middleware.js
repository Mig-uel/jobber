export const errorHandler = (err, req, res, next) => {
  console.log(err)

  let message
  let status = err.status || 500
  let stack = process.env.NODE_ENV === 'dev' ? err.stack : '🥞'

  if (err.kind === 'ObjectId') {
    message = 'Invalid ID'
    return res.status(status).json({ message, status, stack })
  }

  message = err.message || 'Something went wrong...'

  return res.status(status).json({ message, status, stack })
}
