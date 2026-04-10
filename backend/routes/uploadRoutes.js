import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// 1. Define where to store the files and what to name them
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Store in an 'uploads' folder
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// 2. Filter the file type (Images only)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
});

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    image: `/${req.file.path.replace(/\\/g, "/")}`, // Fix for Windows paths
  });
});

export default router;