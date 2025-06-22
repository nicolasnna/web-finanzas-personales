import express from "express"
import authRouter from "./routes/auth.routes"
import incomesRouter from "./routes/incomes.routes"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '@/swagger'
import expensesRouter from "./routes/expenses.routes"
import categoryIncomesRouter from "./routes/categoriesIncomes.routes"
import categoryExpensesRouter from "./routes/categoriesExpenses.routes"

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

app.use("/api", incomesRouter)
app.use("/api", expensesRouter)

app.get("/", (req, res) => {
  res.cookie("refreshToken", "token")
  res.status(200).send("API funcionando")
})

export default app