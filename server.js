import 'express-async-errors'
import { configDotenv } from 'dotenv'
configDotenv({})
import express from 'express'
import mongoose from 'mongoose'
import { connectDB } from './utils/db.utils.js'

// __dirname ES6
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// MIDDLEWARE IMPORTS
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import {
  authenticateUser,
  isAdmin,
  isAuth,
} from './middleware/auth.middleware.js'
import { errorHandler } from './middleware/errorHandler.middleware.js'

// ROUTERS
import jobsRouter from './routes/jobs.route.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import adminRouter from './routes/admin.route.js'
import { log } from 'console'

const app = express()
const port = process.env.PORT || 5100

// __dirname
const __dirname = dirname(fileURLToPath(import.meta.url))

// MIDDLEWARE
process.env.NODE_ENV === 'dev' && app.use(morgan('dev')) // logs only in dev mode
app.use(express.static(path.resolve(__dirname, 'public'))) // static folder
app.use(cookieParser())
app.use(express.json())

// ROUTES
app.use('/api/v1/jobs', isAuth, authenticateUser, jobsRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', isAuth, authenticateUser, userRouter)
app.use('/api/v1/admin', isAuth, authenticateUser, isAdmin, adminRouter)

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
