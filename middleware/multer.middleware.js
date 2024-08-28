import path from 'path'
import multer from 'multer'
import DataParser from 'datauri/parser.js'

const storage = multer.memoryStorage({
  filename: (req, file, callback) => {
    const fileName = `${Date.now()}.${file.originalname.split('.')[1]}`

    callback(null, fileName)
  },
})

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  )
    return callback(null, true)

  callback(new Error('Image file only!'), false)
}

export const upload = multer({ storage, fileFilter })

// BUFFER HELPER
const parser = new DataParser()

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString()

  return parser.format(fileExtension, file.buffer).content
}
