const db = require('../config/database');

class courses {
  static async getCourses() {
    const [rows] = await db.query(`SELECT * FROM courses`);
    return rows;
  }

  static async getTopicsByCourseId(courseId) {
    const [rows] = await db.query(`SELECT * FROM topics WHERE courseId = ?`, [courseId]);
    return rows;
  }

  static async startCourse(data) {
    const { userId, courseId } = data;
    const [result] = await db.query(`
            INSERT INTO users_courses  (userId, courseId, status, startedAt) VALUES (?, ?, 'In Progress', NOW())`,
      [userId, courseId]);
    return result.insertId;
  }
}

module.exports = courses;