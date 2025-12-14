import { Router } from "express";
import { uploadToS3 } from "../../Helpers/s3";

const routerFileUpload = Router(); 
routerFileUpload.post("/upload", async (req: any, res: any) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.file;

    const uploadRes = await uploadToS3(file, "/");

    return res.json({
      message: "File uploaded successfully",
      data: uploadRes,
    });
  } catch (err) {
     // tslint:disable-next-line:no-console 
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default routerFileUpload;
