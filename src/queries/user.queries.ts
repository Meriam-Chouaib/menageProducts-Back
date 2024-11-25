import { getDbInstance } from '@app/database'
import { User } from '@prisma/client'

const db = getDbInstance()

export const signUp = async (user: User): Promise<User> => {
  return await db.user.create({
    data: { ...user },
  })
}

export const getUser = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
  })
}

export const getUserById = async (id: number) => {
  return await db.user.findFirst({
    where: { id: Number(id) },
  })
}
export const updateUser = async (userId: number, user: User) => {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: user,
    })

    return updatedUser
  } catch (error) {
    console.log(error)
  }
}

export const getUsers = async () => {
  try {
    return await db.user.findMany()
  } catch (e) {
    console.log(e.message)
  }
}
