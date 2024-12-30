//backend/routes/likes.js


const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../routes/authMiddleWare');
const likesController = require('../controllers/likesController');

// Routes
router.post('/:id/like', isAuthenticated, likesController.like);
router.delete('/:id/unlike', isAuthenticated, likesController.unlike);
router.get('/:id/isliked', isAuthenticated, likesController.isLiked);

module.exports = router;
