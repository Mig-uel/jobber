import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads')
  },

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
