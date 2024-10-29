import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Users } from '../data/user'
import { User } from '../interfaces/user'

dotenv.config()

export interface CustomRequest extends Request {
  token?: string
  user?: User
}

const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const bearerToken = req.header('Authorization')
  if (!bearerToken) {
    res.status(401).json({ error: 'Access denied' })
    return
  }
  try {
    const token = bearerToken.split(' ')[1]
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as User

    const user = Users.find(
      (item) => item.username === decoded.username
    ) as User

    if (!user) {
      res.status(401).json({ error: 'User not found' })
      return
    }
    req.token = token
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export default verifyToken
