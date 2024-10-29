import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import { Users } from '../data/user'
import { User } from '../interfaces/user'

dotenv.config()

export const Login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body
    const user = Users.find((item) => item.username === username) as User
    if (user) {
      const secretKey = process.env.JWT_SECRET_KEY
      if (!secretKey) {
        throw new Error('JWT secret key is not defined')
      }
      const accessToken = jwt.sign({ username }, secretKey, {
        expiresIn: '1h',
      })
      res.status(200).json({ accessToken })
    } else {
      res.status(401).json({ error: 'Not found user' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
}
