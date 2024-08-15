import express from 'express'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
configDotenv({})
import { errorHandler } from './middleware/errorHandler.middleware.js'

// routers
import jobsRouter from './routes/jobs.route.js'

const app = express()
const port = process.env.PORT || 5100

// middleware
process.env.NODE_ENV === 'dev' && app.use(morgan('dev')) // logs only in dev mode
app.use(express.json())

// routes
app.use('/api/v1/jobs', jobsRouter)

// not found route
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// custom error handling
app.use(errorHandler)

app.listen(port, '0.0.0.0', () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`)
})
