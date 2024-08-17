export const errorHandler = (err, req, res, next) => {
  console.log(err)

  const message = err.message || 'Something went wrong...'
  const status = err.status || 500
  const stack = process.env.NODE_ENV === 'dev' ? err.stack : '🥞'

  // no longer need, using express validator
  // if (err.kind === 'ObjectId') {
  //   message = 'Invalid ID'
  //   return res.status(status).json({ message, status, stack })
  // }

  return res.status(status).json({ message, status, stack })
}
