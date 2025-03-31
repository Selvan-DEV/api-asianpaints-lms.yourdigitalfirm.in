const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/start-topic', userController.startTopic);
router.post('/topic-status-update', userController.topicStatusUpdate);
router.post('/start-assessment', userController.startAssessment);
router.post('/submit-assessment', userController.submitAssessment);
router.get('/:userId/assessment/:assessmentId', userController.getAssessmentResult);

module.exports = router;
