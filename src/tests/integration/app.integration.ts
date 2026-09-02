import request from "supertest";
import { describe, it, expect } from "@jest/globals";
import app from "../../src/app.js";


describe("Test d'intégration de l'architecture", () => {
  it("devrait récupérer les chiens via route, controller, service et modèle", async () => {
    const response = await request(app).get("/api/dogs");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});