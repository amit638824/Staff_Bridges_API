import fs from "fs";
import path from "path";

export const handleFileUploads = async (req: any, uploadDir: string): Promise<string[]> => {
  const uploadedFiles: string[] = [];

  if (req.files && req.files.files) {
    const files = Array.isArray(req.files.files)
      ? req.files.files
      : [req.files.files];

    // ✅ Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ✅ Move uploaded files
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const uploadPath = path.join(uploadDir, fileName);
      await file.mv(uploadPath);
      uploadedFiles.push(`/uploads/${fileName}`); // store relative path
    }
  }

  return uploadedFiles;
};
