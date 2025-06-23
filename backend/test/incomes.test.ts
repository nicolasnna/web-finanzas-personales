import request from "supertest";
import app from "../src/app";
import { authAdmin } from "@/firebase/firebase";
import { TransactionData } from "@/types/TransactionData.interface";

describe("Incomes endpoint", () => {
  const testEmail = "test@example.com";
  const testPassword = "123456";
  let createdUid: string = "";
  let token: string = "";
  const newTransaction: TransactionData = {
    category: "Sueldo",
    details: "test",
    currency: "CLP",
    date: new Date(Date.now()),
    value: 10000,
  };
  let transactionUid: string = "";

  beforeAll(async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ email: testEmail, password: testPassword });
    const user = await authAdmin.getUserByEmail(testEmail);
    createdUid = user.uid;

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testEmail, password: testPassword });
    token = res.body.token;
  });

  it("should create a new incomes", async () => {
    const res = await request(app)
      .post("/api/incomes")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newTransaction });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("value");
    expect(res.body.value).toBe(newTransaction.value);
    transactionUid = res.body.id;
  });

  it("should get all incomes", async () => {
    const res = await request(app)
      .get("/api/incomes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].value).toBe(newTransaction.value);
  });

  it("should update created incomes", async () => {
    const updateTransaction = { ...newTransaction, value: 2430 };

    const resUpdate = await request(app)
      .put(`/api/incomes/${transactionUid}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateTransaction);

    expect(resUpdate.status).toBe(200);

    const res = await request(app)
      .get("/api/incomes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].value).toBe(updateTransaction.value);
  });

  it("should delete income", async () => {
    const res = await request(app)
      .delete(`/api/incomes/${transactionUid}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);

    const resAfterDelete = await request(app)
      .get("/api/incomes")
      .set("Authorization", `Bearer ${token}`);
    expect(resAfterDelete.status).toBe(200);
    expect(resAfterDelete.body.length).toEqual(0);
  });

  afterAll(async () => {
    if (createdUid) {
      await authAdmin.deleteUser(createdUid);
    }
  });
});
