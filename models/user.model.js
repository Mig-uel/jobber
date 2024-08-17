import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { ROLE } from '../utils/constants.utils.js'

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

/**
 * @desc COMPARES THE ENTERED PASSWORD WITH THE FOUND USER PASSWORD
 * @param {string} enteredPassword
 * @returns {Promise<boolean>} - A PROMISE THAT RESOLVES TO TRUE IF THE ENTERED PASSWORD MATCHES THE FOUND USER PASSWORD, OTHERWISE RETURNS FALSE
 */
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// PASSWORD PRE-SAVE MIDDLEWARE
UserSchema.pre('save', async function (next) {
  // if the password field is not modified, don't do anything
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)

  return next()
})

export default mongoose.model('User', UserSchema)
