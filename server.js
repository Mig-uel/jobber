import express from 'express'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
configDotenv({})

const port = process.env.PORT || 5100
const app = express()

// middleware
process.env.NODE_ENV === 'dev' && app.use(morgan('dev')) // logs only in dev mode
app.use(express.json())

app.listen(port, '0.0.0.0', () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`)
})
