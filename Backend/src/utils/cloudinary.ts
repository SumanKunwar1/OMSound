import { v2 as cloudinary } from "cloudinary"
import type { Express } from "express"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadToCloudinary = async (buffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error)
            reject(error)
          } else if (result) {
            resolve(result.secure_url)
          } else {
            reject(new Error("Upload failed - no result"))
          }
        },
      )
      .end(buffer)
  })
}

export const uploadImages = async (files: Express.Multer.File[], folder: string): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer, folder))
  return Promise.all(uploadPromises)
}
