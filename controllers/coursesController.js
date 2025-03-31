const Courses = require('../models/coursesModel');
const User = require('../models/userModel');

exports.coursesList = async (req, res) => {
  try {
    const { userId } = req.params;
    const coursesList = await Courses.getCourses();
    const coursesWithUserData = await Promise.all(coursesList.map(async (item) => {
      const userCourse = await User.getUserStartedCourses(userId, item.courseId);
      return {
        ...item,
        courseStatus: userCourse ? userCourse.status : null,
        courseStartedDate: userCourse ? userCourse.startedAt : null,
        completedDate: userCourse ? userCourse.completedDate : null,
        userCourseId: userCourse ? userCourse.userCourseId : null,
      };
    }));

    res.status(200).json(coursesWithUserData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.topics = async (req, res) => {
  try {

    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    const topics = await Courses.getTopicsByCourseId(courseId);
    const topicsWithAssessment = await Promise.all(topics.map(async (item) => {
      const assessment = await User.getUserAssessmentByCourseId(item.courseId);
      return {
        ...item,
        assessmentId: assessment.assessmentId
      };
    }));

    res.status(200).json(topicsWithAssessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.startCourse = async (req, res) => {
  try {

    const { userId, courseId } = req.body;

    if (!courseId || !userId) {
      return res.status(400).json({ message: 'Course ID and User ID is required' });
    }

    await Courses.startCourse({ userId, courseId });
    res.status(201).json({ message: "Course started successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
