import express from "express";
import * as AuthHandler from "./importCommonController"; 
const loginRoute = express.Router(); 
/* ---------------------------------------------
    REGISTRATION (SEEKER + RECRUITER)
----------------------------------------------*/
// Seeker Registration
loginRoute.post("/seeker-register-mobile", AuthHandler.SeekerRegistrationMobileController);
loginRoute.post("/seeker-register-otp-verify", AuthHandler.SeekerOTPVerifyController); 
// Recruiter Registration
loginRoute.post("/recruiter-register-mobile", AuthHandler.RecruiterRegistrationMobileController);
loginRoute.post("/recruiter-register-otp-verify", AuthHandler.RecruiterOTPVerifyController);
/* ---------------------------------------------
   LOGIN SYSTEM (OTP, MOBILE, SOCIAL, EMAIL)
----------------------------------------------*/
loginRoute.post("/send-otp", AuthHandler.SendOtpMobileController);
loginRoute.post("/mobile-login", AuthHandler.MobileLoginController);
loginRoute.post("/social-login", AuthHandler.SocialLoginController);
loginRoute.post("/email-login", AuthHandler.EmailLoginController);
/* ---------------------------------------------
   PASSWORD MANAGEMENT   
----------------------------------------------*/
loginRoute.post("/forget-password", AuthHandler.ForgetPassword);
loginRoute.post("/reset-password", AuthHandler.ResetPassword);
loginRoute.post("/reset-token-check", AuthHandler.ResetTockenCheck); 

/* ---------------------------------------------
   user email and mobile verification
----------------------------------------------*/
 
loginRoute.post("/user-email-verify-otp", AuthHandler.UserEmailVerificationSendOtp); 
loginRoute.put("/user-email-verify", AuthHandler.verifyUserEmail); 
loginRoute.post("/user-mobile-verify-otp", AuthHandler.UserMobileVerificationSendOtp); 
loginRoute.put("/user-mobile-verify", AuthHandler.verifyUserMobile); 
/* ---------------------------------------------
   USER PROFILE MANAGEMENT
----------------------------------------------*/
loginRoute.put("/user-profile-update", AuthHandler.userProfileUpdate);
loginRoute.get("/user-profile/:email", AuthHandler.ProfileUpdate); 
/* ---------------------------------------------
   ROLE & PERMISSION
----------------------------------------------*/
loginRoute.post("/add-role", AuthHandler.insertContactUs); 
/* ---------------------------------------------
   CONTACT US
----------------------------------------------*/
loginRoute.post("/contact-us", AuthHandler.insertContactUs);
loginRoute.get("/contact-us", AuthHandler.readContactUs);
loginRoute.delete("/contact-us/:id", AuthHandler.deleteContactUs);

export default loginRoute;
