const express = require('express');
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { createBook, getBooks, getBookById } = require('../controller/bookController');

router.post('/createBook', authMiddleware, createBook);
router.get('/getBooks', getBooks);
router.get('/getbookById/:id', getBookById);

module.exports = router;
