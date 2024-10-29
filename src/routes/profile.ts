import express from 'express'
import verifyToken from '../middleware/authMiddleware'
import { Index } from '../controllers/profileController'

const router = express.Router()

router.get('/', verifyToken, Index)

export default router
