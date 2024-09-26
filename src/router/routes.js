import express from 'express'
import userRouter from './user.routes.js'
import ebookRoutes from './ebook.routes.js'

const router = express()

router.use("/ebook", ebookRoutes)
router.use("/auth", userRouter)

export default router