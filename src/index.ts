import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { Endpoints } from './config/endpoints'
import { mainRouter } from './routes/main.routes'

const app: Application = express()
const PORT = process.env.PORT || 3000

const { API, ROOT } = Endpoints

app.get(ROOT, (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Yarn!')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

app.use(API, mainRouter)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('this request is not found!')
  next()
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
