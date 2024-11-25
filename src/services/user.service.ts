import * as userQueries from '../queries/user.queries'

const getUsers = async () => {
  return await userQueries.getUsers()
}
export { getUsers }
