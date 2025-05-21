const express = require('express');
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {addReview, updateReview, deleteReview } = require('../controller/reviewController');

router.post('/addReview/:bookid', authMiddleware, addReview);
router.put('/updateReview/:id', authMiddleware, updateReview);
router.delete('/deleteReview/:id', authMiddleware, deleteReview);

module.exports = router;
