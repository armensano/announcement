import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { path } from 'app-root-path';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { UPLOAD_FILE_TYPE_ERROR } from '../files.constants';

import { v4 as uuidv4 } from 'uuid';
import { PATH_TO_UPLOADS } from 'src/constants';

export const multerConfig = {
  dest: `${path}/${PATH_TO_UPLOADS}`,
};

export const multerOptions = {
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      cb(null, true);
    } else {
      cb(
        new BadRequestException(
          UPLOAD_FILE_TYPE_ERROR(`${extname(file.originalname)}`),
        ),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      const id = uuidv4();
      cb(null, `${id}${file.originalname}`);
    },
  }),
};
