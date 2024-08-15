import express from 'express'
import dotenv from 'dotenv/config'

// configDotenv()
const port = process.env.PORT

const app = express()

app.listen(port, '0.0.0.0', () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`)
})
