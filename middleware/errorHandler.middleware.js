export const errorHandler = (err, req, res, next) => {
  console.log(err)

  const status = err.status || 500
  const message = err.message || 'Something went wrong...'

  return res.status(status).json({ message })
}
