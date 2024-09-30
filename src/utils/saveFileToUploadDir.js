import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { env } from './env.js';

export const saveFileToUploadDir = async (file) => {
  console.log(`Moving file from ${TEMP_UPLOAD_DIR} to ${UPLOAD_DIR}`);
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );
  console.log(`File saved to upload directory: ${UPLOAD_DIR}`);
  return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
};
