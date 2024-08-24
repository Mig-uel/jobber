import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import Job from '../models/job.model.js'
import User from '../models/user.model.js'
import { log } from 'console'

try {
  await mongoose.connect(process.env.MONGO_URI)

  const user = await User.findOne({ email: 'admin@email.com' })

  const jsonJobs = JSON.parse(
    await readFile('MOCK_DATA.json', new URL(import.meta.url))
  )

  const jobs = jsonJobs.map((job) => {
    return { ...job, user: user._id }
  })

  await Job.deleteMany({ user: user._id })

  await Job.insertMany(jobs)

  log('Inserted jobs successfully!')
  process.exit(0)
} catch (error) {
  log(error)
  process.exit(1)
}
