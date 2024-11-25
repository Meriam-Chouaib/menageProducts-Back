import { User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import * as authService from '../services/auth.service'
import httpStatus from 'http-status'
import ApiResponse from '@app/utils/ApiResponse'

const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const data: User = req.body as User
  console.log('data', data)

  try {
    const user = await authService.signup(data)
    res.status(httpStatus.OK).send(user)
  } catch (err) {
    next(err)
  }
}

const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body
  try {
    const result: any = await authService.signin(email, password)
    res.status(result.status).send(result)
  } catch (err) {
    next(err)
  }
}

//**************** TODO fixing the logout
// const logout = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const token = getTokenFromHeaders(req)
//   if (!token) {
//     res
//       .status(httpStatus.BAD_REQUEST)
//       .send(new ApiResponse(400, {}, 'Token not provided'))
//   }

//   try {
//     if (req.session) {
//       req.session.destroy((err) => {
//         if (err) {
//           res.status(400).send('Unable to log out')
//         } else {
//           res.send('Logout successful')
//         }
//       })
//     } else {
//       res.end()
//     }
//     const response = await authService.logout(token)
//     console.log('🚀 ~ response:', response)
//     res.status(httpStatus.OK).send(response)
//   } catch (err) {
//     next(err)
//   }
// }
const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send(
              new ApiResponse(500, {}, 'Unable to log out due to session error')
            )
        }
        res
          .status(httpStatus.OK)
          .send(new ApiResponse(200, {}, 'Logout successful'))
      })
    } else {
      res
        .status(httpStatus.BAD_REQUEST)
        .send(new ApiResponse(400, {}, 'No active session found'))
    }
  } catch (err) {
    next(err)
  }
}

export { signUp, signIn, logout }
