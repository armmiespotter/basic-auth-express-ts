import express, { Express, Request, Response } from 'express'
import AuthRoute from './routes/auth'
import profileRoute from './routes/profile'

const app: Express = express()
app.use(express.json())

app.use('/auth', AuthRoute)
app.use('/profile', profileRoute)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ hello: 'world' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
