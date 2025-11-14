import express from "express";
import * as Handler from "./importCommonController"; 
const loginRoute = express.Router();

// // User Details user
loginRoute.post("/seeker-register-mobile", Handler.SeekerRegistrationMobileController);
loginRoute.post("/seeker-register-otp-verify", Handler.SeekerOTPVerifyController); 
loginRoute.post("/email-login", Handler.EmailLoginController);
loginRoute.post("/send-otp", Handler.SendOtpMobileController);
loginRoute.post("/mobile-login", Handler.MobileLoginController); 
loginRoute.post("/social-login", Handler.SocialLoginController);
loginRoute.put("/user-profile-update", Handler.userProfileUpdate);
loginRoute.get("/user-profile/:email", Handler.ProfileUpdate);
loginRoute.post("/forget-password", Handler.ForgetPassword);
loginRoute.post("/reset-password", Handler.ResetPassword);
loginRoute.post("/reset-token-check", Handler.ResetTockenCheck);

// Add role and permission
loginRoute.post("/add-role", Handler.ResetTockenCheck);

// Contact Details
loginRoute.post("/contact-us", Handler.insertContactUs);
loginRoute.get("/contact-us", Handler.readContactUs);
loginRoute.delete("/contact-us/:id", Handler.deleteContactUs);

export default loginRoute;