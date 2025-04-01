const db = require('../config/database');

class User {
  static async createUser(userData) {
    const { firstName, lastName, email, phoneNumber, password } = userData;
    const [result] = await db.query(`
            INSERT INTO users (firstName, lastName, email, phoneNumber, password)
            VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, email, phoneNumber, password]);
    return result.insertId;
  }

  static async findUserByEmail(email) {
    const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]
    );
    return rows[0];
  }

  static async getUserById(userId) {
    const [rows] = await db.query(`SELECT * FROM users WHERE userId = ?`, [userId]);
    return rows[0];
  }

  static async updateUser(userId, userData) {
    const { firstName, lastName, email, phoneNumber } = userData;
    const [result] = await db.query(`
            UPDATE users SET firstName = ?, lastName = ?, email = ?, phoneNumber = ? WHERE userId = ?`,
      [firstName, lastName, email, phoneNumber, userId]);
    return result.affectedRows;
  }

  static async deleteUser(userId) {
    const [result] = await db.query(`UPDATE users SET isActive = false WHERE userId = ?`, [userId]);
    return result.affectedRows;
  }

  static async startTopic(data) {
    const { userId, topicId, courseId } = data;
    const [result] = await db.query(`
            INSERT INTO user_topics  (userId, topicId, status, courseId) VALUES (?, ?, ?, ?)`,
      [userId, topicId, 'started', courseId]);
    return result.insertId;
  }

  static async topicStatusUpdate(data) {
    const { userId, topicId } = data;
    const [result] = await db.query(`
            UPDATE user_topics SET status = ?, completedAt = NOW() WHERE userId = ? AND topicId = ?`,
      ['completed', userId, topicId]);
    return result;
  }

  static async startAssessment(data) {
    const { userId, assessmentId, topicId, courseId } = data;
    const [result] = await db.query(`
            INSERT INTO user_assessments (userId, assessmentId, topicId, totalQuestions, status, startedAt, courseId) 
         VALUES (?, ?, ?, '0', 'started', NOW(), ?)`,
      [userId, assessmentId, topicId, courseId]);
    return result.insertId;
  }

  static async findUserAssessment(userId, assessmentId) {
    const [rows] = await db.query(`SELECT id FROM user_assessments WHERE userId = ? AND assessmentId = ?`, [userId, assessmentId]);
    return rows;
  }

  static async getCorrectAnswer(questionId) {
    const [rows] = await db.query(`SELECT * FROM answers WHERE questionId = ? AND isCorrect = 1`, [questionId]);
    return rows[0];
  }

  static async insertUserAnswers(data) {
    const { userId, assessmentId, questionId, selectedOption, isCorrect } = data;
    const [result] = await db.query(`
            INSERT INTO user_answers (userId, assessmentId, questionId, selectedOption, isCorrect) VALUES (?, ?, ?, ?, ?)`,
      [userId, assessmentId, questionId, selectedOption, isCorrect]);
    return result.insertId;
  }

  static async updateUserAssessment(data) {
    const { correctAnswers, userId, assessmentId } = data;
    const [result] = await db.query(`
            UPDATE user_assessments SET score=?, status = 'completed', completedAt = NOW() WHERE userId = ? AND assessmentId = ?`,
      [correctAnswers, userId, assessmentId]);
    return result;
  }

  static async getAssessmentResult(params) {
    const { userId, assessmentId } = params;
    const query = `SELECT score, totalQuestions FROM user_assessments WHERE userId = ? AND assessmentId = ?`
    const [rows] = await db.query(query, [userId, assessmentId]);
    return rows;
  }

  static async getUserStartedCourses(userId, courseId) {
    const [rows] = await db.query(`SELECT * FROM users_courses WHERE userId = ? AND courseId = ?`, [userId, courseId]);
    return rows[0];
  }

  static async getUserAssessmentByCourseId(courseId) {
    const [rows] = await db.query(`SELECT assessmentId FROM assessments WHERE courseId = ?`, [courseId]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async updatePassword(userId, hashedPassword) {
    const [result] = await db.query('UPDATE users SET password = ? WHERE userId = ?', [hashedPassword, userId]);
    return result;
  }
}

module.exports = User;