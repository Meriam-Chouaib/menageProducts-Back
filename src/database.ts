import { PrismaClient } from '@prisma/client'
let database: PrismaClient

export const getDbInstance = (): PrismaClient => {
  if (!database) {
    database = new PrismaClient()
    database
      .$connect()
      .then(() => {
        console.log('Connected to database', 'APP')
      })
      .catch((err: any) => {
        console.log(err.message, 'Datasource')
      })
  }
  return database
}
