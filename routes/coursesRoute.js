const express = require('express');
const coursesController = require('../controllers/coursesController');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/user/:userId', authMiddleware, coursesController.coursesList);
router.get('/:courseId/topics', authMiddleware, coursesController.topics);
router.post('/start-course', authMiddleware, coursesController.startCourse);

module.exports = router;