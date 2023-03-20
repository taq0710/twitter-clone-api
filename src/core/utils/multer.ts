import { FileFilterCallback, diskStorage, memoryStorage } from 'multer';

const storageDisk = diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'files') return cb(null, './public/thumbs');
    return cb(null, './public/results');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const storageMemory = memoryStorage();

const fileFilter = (
  request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const multerDiskOption = {
  storage: storageDisk,
  fileFilter,
};

export const multerMemoryOption = {
  storage: storageMemory,
  fileFilter,
};
