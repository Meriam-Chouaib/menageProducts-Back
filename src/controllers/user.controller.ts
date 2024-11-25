import { NextFunction, Request, Response } from 'express'
import * as userService from '@app/services/user.service'
import { User } from '@prisma/client'

const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userService.getUsers()
    res.status(200).send(users)
  } catch (error) {
    console.log(error.message)
  }
}
export { getUsers }
