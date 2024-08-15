import express from 'express'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
configDotenv({})

const port = process.env.PORT
const app = express()

app.use(morgan('combined'))
app.use(express.json())

app.listen(port, '0.0.0.0', () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`)
})
