const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const book_path = path.join('/uploads/images');

const bookSchema = mongoose.Schema({
  book_name: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  pages: {
    type: String,
  },
  description: {
    type: String,
  },
  book_image: {
    type: String,
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', book_path));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

bookSchema.statics.upload = multer({ storage: storage }).single('book_image');

bookSchema.statics.bookPath = book_path;

const bookset = mongoose.model('bookset', bookSchema);

module.exports = bookset;
