import express from "express"
import { authCheck, login, logout, singUp } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router=express.Router()


//Checking Purpose
router.get("/", (req, res) => {
    res.send("Server is Ready 123");
  })
//User Routers
router.post("/signup",singUp)
router.post("/login",login)
router.post("/logout",logout)
router.get("/authCheck",protectRoute,authCheck)



export default router