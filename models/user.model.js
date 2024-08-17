import mongoose, { Schema } from 'mongoose'
import { ROLE } from '../utils/constants.utils'

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.USER,
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
