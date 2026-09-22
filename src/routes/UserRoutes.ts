import { Router } from "express"
import { UserController } from "../controllers/UserController.js"
import { verifyToken } from "../middlewares/verifyTokenMiddleware.js"



const userRouter = Router()

userRouter.get("/", UserController.getAllUsers)
userRouter.get("/me", verifyToken, UserController.getUserMe)
userRouter.get("/profile/:userId", verifyToken, UserController.getUserProfile)
userRouter.post("/", UserController.createUser)
userRouter.get("/:userId", UserController.getUserById)
userRouter.put("/:userId", UserController.updateUser)
userRouter.delete("/:userId", UserController.deleteUser)

export default userRouter;