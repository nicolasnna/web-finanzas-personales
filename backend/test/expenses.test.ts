import request from "supertest";
import app from "../src/app";
import { authAdmin } from "@/firebase/firebase";
import { TransactionData } from "@/types/TransactionData.interface";

describe("Expense endpoint", () => {
  const testEmail = "test@example.com";
  const testPassword = "123456";
  let createdUid: string = "";
  let token: string = "";
  const newTransaction: TransactionData = {
    category: "Compra",
    details: "test",
    currency: "CLP",
    date: new Date(Date.now()),
    value: 5000,
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

  it("should create a new expense", async () => {
    const res = await request(app)
      .post("/api/expenses")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newTransaction });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("value");
    expect(res.body.value).toBe(newTransaction.value);
    transactionUid = res.body.id;
  });

  it("should get all expenses", async () => {
    const res = await request(app)
      .get("/api/expenses")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].value).toBe(newTransaction.value);
  });

  it("should update created expense", async () => {
    const updateTransaction = { ...newTransaction, value: 2430 };

    const resUpdate = await request(app)
      .put(`/api/expenses/${transactionUid}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateTransaction);

    expect(resUpdate.status).toBe(200);

    const res = await request(app)
      .get("/api/expenses")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].value).toBe(updateTransaction.value);
  });

  it("should delete expense", async () => {
    const res = await request(app)
      .delete(`/api/expenses/${transactionUid}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);

    const resAfterDelete = await request(app)
      .get("/api/expenses")
      .set("Authorization", `Bearer ${token}`);
    expect(resAfterDelete.status).toBe(200);
    expect(resAfterDelete.body.length).toEqual(0);
  });

  const trans2: TransactionData = {
    category: "Compra",
    details: "test2",
    currency: "CLP",
    date: new Date(Date.now()),
    value: 23000,
  };

  it("should get top expenses orderer desc", async () => {
    const resFirstAdd = await request(app)
      .post("/api/expenses")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newTransaction });

    expect(resFirstAdd.status).toBe(201);

    const resAddNew = await request(app)
      .post("/api/expenses")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...trans2 });

    expect(resAddNew.status).toBe(201);

    const resTop = await request(app)
      .get("/api/resume/top?type=expenses&limit=1")
      .set("Authorization", `Bearer ${token}`);

    expect(resTop.status).toBe(200);
    expect(resTop.body[0].value).toEqual(trans2.value);
    expect(resTop.body.length).toEqual(1);
  });

  it("should get resume by category", async () => {
    const dateNow = new Date(Date.now());

    const resResume = await request(app)
      .get(
        `/api/resume/by-category?type=expenses&year=${dateNow.getFullYear()}&groupBy=category`
      )
      .set("Authorization", `Bearer ${token}`);

    expect(resResume.status).toBe(200)
    expect(resResume.body[trans2.category]).toEqual(newTransaction.value + trans2.value)
  });

  afterAll(async () => {
    if (createdUid) {
      await authAdmin.deleteUser(createdUid);
    }
  });
});
