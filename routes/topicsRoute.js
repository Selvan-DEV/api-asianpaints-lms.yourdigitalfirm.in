const express = require('express');
const topicsController = require('../controllers/topicsController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, topicsController.topics);
router.get('/:topicId', authMiddleware, topicsController.topic);
router.get('/:topicId/content', authMiddleware, topicsController.content);
router.get('/:topicId/assessment', authMiddleware, topicsController.assessment);

module.exports = router;
