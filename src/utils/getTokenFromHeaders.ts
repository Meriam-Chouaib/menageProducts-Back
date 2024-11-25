export const getTokenFromHeaders = (req: any): string | undefined => {
  const token = req.headers.authorization?.split(' ')[1]
  return token
}
