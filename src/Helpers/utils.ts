import crypto from "crypto";  
const ENCRYPTION_KEY = crypto.randomBytes(32);  
const IV_LENGTH = 16;

export const encryptPayload = (text: any) => {
    const iv = crypto.randomBytes(IV_LENGTH); 
    const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);

    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");

    // Combine IV and encrypted text as a single string
    return `${iv.toString("base64")}:${encrypted}`;
};  
export const decryptPayload = (encryptedData: any) => {
    const [iv, encryptedText] = encryptedData?.split(":")?.map((part: any) => Buffer?.from(part, "base64"));
    const decipher = crypto?.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);

    let decrypted = decipher?.update(encryptedText, "base64", "utf8");
    decrypted += decipher?.final("utf8");

    return decrypted;
};  
export const generateToken = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const tokenLength = 20;
    let token = "";

    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }

    return token;
};  
// Fields to consider for profile completion
 
const PROFILE_FIELDS = [
  { key: "user_fullName", label: "Full Name" },
  { key: "user_email", label: "Email" },
  { key: "user_mobile", label: "Mobile Number" },
  { key: "user_gender", label: "Gender" },
  { key: "user_age", label: "Age" },
  { key: "user_education", label: "Education" },
  { key: "user_city", label: "City" },
  { key: "user_locality", label: "Locality" },
  { key: "user_profilePic", label: "Profile Picture" },
  { key: "user_resume", label: "Resume" },
  { key: "user_salary", label: "Expected Salary" },
];
export const getProfileCompletion = (user: any) => {
  const totalFields = PROFILE_FIELDS.length;

  let filledCount = 0;
  const missingFields: any[] = [];

  PROFILE_FIELDS.forEach(({ key, label }) => {
    const value = user[key];

    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value !== "undefined"
    ) {
      filledCount++;
    } else {
      missingFields.push({
        field: key,
        label,
        message: `${label} is not filled`,
      });
    }
  });

  const percentage = Math.ceil((filledCount / totalFields) * 100);

  return {
    percentage,
    filledCount,
    totalFields,
    missingFields,
  };
};




export const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
