import 'express-async-errors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
configDotenv({})
import express from 'express'
import mongoose from 'mongoose'
import { connectDB } from './utils/db.utils.js'
import { errorHandler } from './middleware/errorHandler.middleware.js'

// routers
import jobsRouter from './routes/jobs.route.js'
import authRouter from './routes/auth.route.js'

const app = express()
const port = process.env.PORT || 5100

// middleware
process.env.NODE_ENV === 'dev' && app.use(morgan('dev')) // logs only in dev mode
app.use(express.json())

// routes
app.use('/api/v1/jobs', jobsRouter)
app.use('/api/v1/auth', authRouter)

// not found route
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' })
}) // triggered if the resource does not exists

// custom error handling
app.use(errorHandler) // triggered by existing controllers (valid routes) + for synchronous requests

try {
  await connectDB()
  console.log(`MONGODB CONNECTED: ${mongoose.connection.name}`)
  app.listen(port, '0.0.0.0', () => {
    console.log(`SERVER RUNNING ON PORT: ${port}`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
