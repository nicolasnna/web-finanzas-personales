import request from "supertest";
import app from "../src/app";
import { authAdmin } from "@/firebase/firebase";
import { Category } from "@/types/category.interface";

describe("Categories expenses endpoint", () => {
  const testEmail = "test@example.com";
  const testPassword = "123456";
  let createdUid: string = "";
  let token: string = "";
  const newCategory: Category = {
    category: "Compra",
  };
  let categoryId: string = "";

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

  it("should create a new expense category", async () => {
    const res = await request(app)
      .post("/api/categories/expenses")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...newCategory });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("category");
    expect(res.body.category).toBe(newCategory.category);
    categoryId = res.body.id;
  });

  it("should get all expenses categories", async () => {
    const res = await request(app)
      .get("/api/categories/expenses")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].category).toBe(newCategory.category);
  });

  it("should update created expense category", async () => {
    const updateCategory = { ...newCategory, category: 'otra compra' };

    const resUpdate = await request(app)
      .put(`/api/categories/expenses/${categoryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateCategory);

    expect(resUpdate.status).toBe(200);

    const res = await request(app)
      .get("/api/categories/expenses")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].category).toBe(updateCategory.category);
  });

  it("should delete expense category", async () => {
    const res = await request(app)
      .delete(`/api/categories/expenses/${categoryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);

    const resAfterDelete = await request(app)
      .get("/api/categories/expenses")
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
