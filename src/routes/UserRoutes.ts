import { Router } from "express"
import { UserController } from "../controllers/UserController.js"



const userRouter = Router()

userRouter.get("/", UserController.getAllUsers)
userRouter.get("/:userId", UserController.getUserById)
userRouter.post("/", UserController.createUser)
userRouter.put("/:userId", UserController.updateUser)
userRouter.delete("/:userId", UserController.deleteUser)

export default userRouter;