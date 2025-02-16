import express from "express"
import authRouter from "./routes/auth.routes"
import dbRouter from "./routes/db.routes"
import cors from 'cors'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.use("/auth", authRouter)
app.use("/db", dbRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("Escuchando en el puerto 4000")
})