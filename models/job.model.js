import mongoose, { Schema, Types } from 'mongoose'
import { STATUS, TYPE } from '../utils/constants.utils.js'

const JobSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    },
    type: {
      type: String,
      enum: Object.values(TYPE),
      default: TYPE.FULL_TIME,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
