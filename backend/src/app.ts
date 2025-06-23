import express from "express"
import authRouter from "./routes/auth.routes"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '@/swagger'
import categoryIncomesRouter from "./routes/categoriesIncomes.routes"
import categoryExpensesRouter from "./routes/categoriesExpenses.routes"
import transactionRouter from "./routes/transaction.routes"

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

app.use("/api", categoryIncomesRouter)
app.use("/api", categoryExpensesRouter)

app.use("/api", transactionRouter)

app.get("/", (req, res) => {
  res.cookie("refreshToken", "token")
  res.status(200).send("API funcionando")
})

export default app