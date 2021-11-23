import multer from 'multer';

export const multerSetting = (req, file, cb) => {
  if (
    file.mimetype.split('/')[1] === 'jpg' ||
    file.mimetype.split('/')[1] === 'png' ||
    file.mimetype.split('/')[1] === 'jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Not a PDF File!!'), false);
  }
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerSetting,
});
