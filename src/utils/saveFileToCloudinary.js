import cloudinary from 'cloudinary';

import fs from 'node:fs/promises';

import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    console.log(`Uploading file to Cloudinary from path: ${file.path}`);
    const response = await cloudinary.v2.uploader.upload(file.path);
    console.log(`Cloudinary response: ${JSON.stringify(response)}`);

    await fs.unlink(file.path);
    console.log(`Deleted local file: ${file.path}`);

    return response.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Cloudinary upload failed');
  }
};
