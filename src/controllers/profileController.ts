import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { CustomRequest } from '../middleware/authMiddleware'

dotenv.config()

export const Index = (req: CustomRequest, res: Response): void => {
  console.log('🧙‍♂️ ~ Index ~ req:', req.user)
  res.status(200).json({
    message: 'Protected route accessed',
    user: req.user,
  })
}
