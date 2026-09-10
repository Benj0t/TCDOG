// src/middlewares/validate.middleware.ts
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

type RequestTarget = "body" | "params" | "query";

export const validate = (schema: z.ZodType<unknown>, target: RequestTarget = "body") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req[target] = await schema.parseAsync(req[target]);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Erreur de validation",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      return next(error);
    }
  };
};