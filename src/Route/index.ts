import express from "express";
import * as Handler from "./importController"; 
const routerAdmin = express.Router();

// User Details
routerAdmin.post("/user-login", Handler.LoginController); // 1      -> .782 s
routerAdmin.put("/user-profile-update", Handler.userProfileUpdate); // 2  -> .282 s
routerAdmin.get("/user-profile/:email", Handler.ProfileUpdate); // 3   -> 2.69 s
routerAdmin.post("/forget-password", Handler.ForgetPassword); // 4    -> 6.34 s
routerAdmin.post("/reset-password", Handler.ResetPassword); // 5     ->.790 s
routerAdmin.post("/reset-token-check", Handler.ResetTockenCheck); // 6  ->.629 s     

// Contact Details
routerAdmin.post("/contact-us", Handler.insertContactUs); // 7 -> 5.7 s ->2.7s
routerAdmin.get("/contact-us", Handler.readContactUs); // 8   ->2.54 s       1s
routerAdmin.delete("/contact-us/:id", Handler.deleteContactUs); // 9   -> .987 s
 
export default routerAdmin;