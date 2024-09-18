import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import multer from "multer";
import{upload}from "../middleware/multer.middleware.js"



 const router =Router();

 router.route("/register").post(
    (req, res, next) => {
        upload.fields([
            { name: "avatar", maxCount: 1 },
            { name: "coverImage", maxCount: 1 }
        ])(req, res, (err) => {
            if (err) {
                console.error("Multer error:", err);
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    },
    registerUser
);
 export default router