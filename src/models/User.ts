import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    name: { type: String, default: '' },
    password: { type: String, default: '' },
    role: { type: String, default: 'user' }
  },
  { timestamps: true }
)

const UserModel = mongoose.model('user', userSchema)

export default UserModel
