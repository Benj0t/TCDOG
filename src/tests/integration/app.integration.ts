import request from "supertest";
import { describe, it, expect } from "@jest/globals";
import app from "../../app.js";


describe("Test d'intégration de l'architecture", () => {
  it("devrait récupérer l'état de la santé via route, controller, service et modèle", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});