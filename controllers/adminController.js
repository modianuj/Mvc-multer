const bookset = require('../models/bookDetail');
const path = require('path');
const fs = require('fs');

module.exports = {
  home: (req, res) => {
    res.render('home');
  },

  insertData: (req, res) => {
    bookset.upload(req, res, (error) => {
      var bookData = bookset.bookPath + '/' + req.file.filename;
      console.log(req.file);
      console.log(req.body.author_name);
      console.log(req.body.pages);
      bookset.create(
        {
          book_name: req.body.book_name,
          author_name: req.body.author_name,
          pages: req.body.pages,
          description: req.body.description,
          book_image: bookData,
        },
        (error, record) => {
          if (error) {
            console.log(`book record not inserted`);
            return false;
          }
          return res.redirect('back');
        }
      );
    });
  },
  viewData: (req, res) => {
    bookset.find({}, (error, bookRecord) => {
      if (error) {
        console.log(`book record view problem`);
        return false;
      }
      return res.render('viewBooks', {
        'singleBook': bookRecord,
      });
    });
  },
  deleteData: (req, res) => {
    var deleteId = req.query.delete_id;
    bookset.findById(deleteId, (error, record) => {
      if (error) {
        console.log(`delete data not found`);
      }
      fs.unlinkSync(path.join(__dirname, '..', record.book_image));
    });

    bookset.findByIdAndDelete(deleteId, (error, record) => {
      if (error) {
        console.log(`delete record error `);
        return false;
      }
      return res.redirect('back');
    });
  },
  editData: (req, res) => {
    var updateId = req.query.update_id;
    bookset.findById(updateId, (error, record) => {
      if (error) {
        console.log(`update data not found`);
        return false;
      }
      return res.render('updateBooks', {
        'updateRecord': record,
        'desc': record.description,
      });
    });
  },
  updateData: (req, res) => {
    bookset.upload(req, res, (error) => {
      var hiddenId = req.body.hidden_id;
      if (req.file) {
        bookset.findById(hiddenId, (error, Oldrecord) => {
          var oldImage = Oldrecord.book_image;
          fs.unlinkSync(path.join(__dirname, '..', oldImage));
        });
        var newBookData = bookset.bookPath + '/' + req.file.filename;
        bookset.findByIdAndUpdate(
          hiddenId,
          {
            book_name: req.body.book_name,
            author_name: req.body.author_name,
            pages: req.body.pages,
            description: req.body.description,
            book_image: newBookData,
          },
          (error) => {
            if (error) {
              console.log(`update new image data failed`);
              return false;
            }
            return res.redirect('/viewBook');
          }
        );
      } else {
        bookset.findById(hiddenId, (error, record) => {
          if (error) {
            console.log(`data not updated`);
          }
          var oldImageData = record.book_image;
          bookset.findByIdAndUpdate(
            hiddenId,
            {
              book_name: req.body.book_name,
              author_name: req.body.author_name,
              pages: req.body.pages,
              description: req.body.description,
              book_image: oldImageData,
            },
            (error) => {
              if (error) {
                console.log(`data updated problem last`);
              }
              return res.redirect('/viewBook');
            }
          );
        });
      }
    });
  },
};
