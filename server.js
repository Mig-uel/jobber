import 'express-async-errors'
import { configDotenv } from 'dotenv'
configDotenv({})
import express from 'express'
import mongoose from 'mongoose'
import { connectDB } from './utils/db.utils.js'

// MIDDLEWARE IMPORTS
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { isAuth } from './middleware/auth.middleware.js'
import { errorHandler } from './middleware/errorHandler.middleware.js'

// ROUTERS
import jobsRouter from './routes/jobs.route.js'
import authRouter from './routes/auth.route.js'

const app = express()
const port = process.env.PORT || 5100

// MIDDLEWARE
process.env.NODE_ENV === 'dev' && app.use(morgan('dev')) // logs only in dev mode
app.use(cookieParser())
app.use(express.json())

// ROUTES
app.use('/api/v1/jobs', isAuth, jobsRouter)
app.use('/api/v1/auth', authRouter)

// NOT FOUND ROUTE
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Resource not found' })
}) // TRIGGERED IF THE RESOURCE DOES NOT EXIST

// CUSTOM ERROR HANDLING
app.use(errorHandler) // TRIGGERED BY EXISTING CONTROLLERS (VALID RESOURCES) + FOR SYNCHRONOUS REQUESTS

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
