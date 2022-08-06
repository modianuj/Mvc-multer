const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/', adminController.home);
router.post('/insertBook', adminController.insertData);
router.get('/viewBook', adminController.viewData);
router.get('/deleteBook', adminController.deleteData);
router.get('/editBook', adminController.editData);
router.post('/updateBook', adminController.updateData);
router.use('/api', require('./api'));

module.exports = router;
