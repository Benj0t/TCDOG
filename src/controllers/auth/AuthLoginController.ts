import { Request, Response } from "express";

export async function authLoginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    console.log("Received login request:", { email, password });
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error occurred while logging in", error});
  }
  // call method to authenticate user with email and password
}