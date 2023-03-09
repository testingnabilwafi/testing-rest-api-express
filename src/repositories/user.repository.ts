import UserModel from '../models/User'
import type { IUser } from '../interfaces/user.inteface'

export const createUser = async (payload: IUser) => {
  const user = await UserModel.create(payload)

  return user
}

export const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email })

  return user
}
