const express = require('express');
const topicsController = require('../controllers/topicsController');
const router = express.Router();


router.get('/', topicsController.topics);
router.get('/:topicId', topicsController.topic);
router.get('/:topicId/content', topicsController.content);
router.get('/:topicId/assessment', topicsController.assessment);

module.exports = router;
