import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'internship'],
      default: 'full-time',
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
