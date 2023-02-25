import dotenv from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.connection.js'
import agencyRouter from './routes/agency.route.js'
import commentsRouter from './routes/comments.route.js'
import exchangeRouter from './routes/exchanges.route.js'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

const app = express()
connectDb()

app.use(cors())
app.use(express.json())
app.use('/exchange', exchangeRouter)
app.use('/user', userRouter)
app.use('/comments', commentsRouter)
app.use('/agency', agencyRouter)
app.use(authRouter)

app.listen(3001, () => console.log('Server listening on port ', 3001))