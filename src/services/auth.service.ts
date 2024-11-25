import { User } from '@prisma/client'
import * as userQueries from '../queries/user.queries'
import { signToken } from '@app/services/jwt.service'
import ApiResponse from '@app/utils/ApiResponse'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import ApiError from '@app/errors/ApiError'

const signup = async (data: User) => {
  try {
    if (await userQueries.getUser(data.email)) {
      return new ApiResponse(400, {}, 'User exists!')
    } else {
      const hash = bcrypt.hashSync(data.password, 15)
      data.password = hash

      const user = await userQueries.signUp(data)
      const token = signToken({ id: user.id, email: data.email })
      return new ApiResponse(200, { user, token }, 'User created successfully!')
    }
  } catch (err) {
    console.log(err.message)
  }
}
const signin = async (email: string, password: string) => {
  try {
    const user = await userQueries.getUser(email)
    if (!user) {
      return new ApiResponse(httpStatus.NOT_FOUND, {}, 'User not found')
    }
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
      return new ApiResponse(401, {}, 'Invalid password')
      // return new ApiError(401, 'Invalid password')
    }
    const token = signToken({ id: user.id, email: user.email })
    return new ApiResponse(
      200,
      { user, token },
      'User authenticated successfully!'
    )
  } catch (error) {
    return new ApiError(error.statusCode, error.message)
  }
}
const logout = async (token: string) => {
  try {
    // NOTE Optional: Add the token to a blacklist
    return new ApiResponse(200, {}, 'Logout successful')
  } catch (err) {
    console.log(err.message)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Logout failed')
  }
}

export { signup, signin, logout }
