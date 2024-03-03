import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { ApiError } from "./ApiError";


cloudinary.config(getCloudinaryConfigOptions());

const getCloudinaryConfigOptions=()=>({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        await uploadFile(localFilePath)
    } catch (error) {
        throw error;
    }
    finally {
        fs.unlinkSync(localFilePath)
    }
}

const uploadFile=async(localFilePath)=>{
            if (!localFilePath) throw new ApiError(400, "localFilePath is missing")
            //upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })

            if (!response.url) throw new ApiError(400, "Error while uploading file on cloud")

            return response;
}



export {uploadOnCloudinary}

