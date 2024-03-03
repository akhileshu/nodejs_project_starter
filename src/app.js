import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors(getCorsOptions))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//routes import
import userRouter from './routes/user.routes.js'


//routes declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register

import { errorHandler } from './middlewares/errorHandler.js'
app.use(errorHandler)

export { app }

const getCorsOptions=()=>({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})