import bcrypt from 'bcrypt'

export const hashing = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

export const verifyPassword = (password: string, passwordHashing: string) => {
  return bcrypt.compareSync(password, passwordHashing)
}
