import express from "express"
import authRouter from "./routes/auth.routes"
import dbRouter from "./routes/db.routes"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '@/swagger'
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
app.use("/api/db", dbRouter)

app.get("/", (req, res) => {
  res.cookie("refreshToken", "token")
  res.status(200).send("API funcionando")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("Escuchando en el puerto 4000")
})