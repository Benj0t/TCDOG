import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// On étend l'interface Request d'Express pour y stocker l'userId
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // 1. On récupère le token depuis le cookie HttpOnly (nécessite le package 'cookie-parser')
  console.log(req.cookies.token);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Aucun token trouvé." });
  }

  try {
    // 2. On vérifie le JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { userId: string };
    
    console.log("Decoded JWT: ", decoded)
    // 3. On injecte l'ID dans la requête pour que le controller puisse l'utiliser
    req.userId = decoded.userId;

    // 4. Tout est bon, on passe la main au controller suivant
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token invalide ou expiré." , error});
  }
}