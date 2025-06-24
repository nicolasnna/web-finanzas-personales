import express from "express"
import authRouter from "./routes/auth.routes"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '@/swagger'
import transactionRouter from "./routes/transaction.routes"
import categoryRouter from "./routes/category.routes"
import resumeRouter from "./routes/resume.routes"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.use("/api/auth", authRouter)

app.use("/api", categoryRouter)
app.use("/api", transactionRouter)
app.use('/api', resumeRouter)

app.get("/", (_, res) => {
  res.status(200).send("API funcionando")
})

export default app