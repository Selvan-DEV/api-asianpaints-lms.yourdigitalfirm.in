const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/start-topic', authMiddleware, userController.startTopic);
router.post('/topic-status-update', authMiddleware, userController.topicStatusUpdate);
router.post('/start-assessment', authMiddleware, userController.startAssessment);
router.post('/submit-assessment', authMiddleware, userController.submitAssessment);
router.get('/:userId/assessment/:assessmentId', authMiddleware, userController.getAssessmentResult);

module.exports = router;
