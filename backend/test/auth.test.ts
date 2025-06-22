import request from 'supertest'
import app from '../src/app'
import { authAdmin } from '@/firebase/firebase'

describe('Auth endpoints', () => {
  const testEmail = "test@example.com"
  const testPassword = "123456"
  let createdUid: string = "";

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({ email: testEmail, password: testPassword})

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("message")
    expect(res.body).toHaveProperty("email")

    const user = await authAdmin.getUserByEmail(testEmail)
    createdUid = user.uid
  })

  it("should login the user", async () => {
    const res = await request(app).post("/api/auth/login").send({ email: testEmail, password: testPassword })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("message")
    expect(res.body).toHaveProperty("token")
  })

  afterAll(async () => {
    if (createdUid) {
      await authAdmin.deleteUser(createdUid)
    }
  })
})