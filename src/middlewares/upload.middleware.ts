import multer from 'multer'
import path from 'path'
import fs from 'fs'

// ******** Ensure uploads directory exists********
const ensureUploadsDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// ******** Configure storage ********
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads')
    ensureUploadsDir(uploadsDir)
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` // Unique filenames
    )
  },
})

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const fileType = /jpeg|jpg|png|gif/
  const mimeType = fileType.test(file.mimetype)
  const extname = fileType.test(path.extname(file.originalname).toLowerCase())
  if (mimeType && extname) {
    return cb(null, true)
  }
  cb(new Error('Only images are allowed!') as unknown as null, false)
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})

export const uploadMultiple = upload.array('images', 5)
