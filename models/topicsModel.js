const db = require('../config/database');

class topics {
  static async getTopics() {
    const [rows] = await db.query(`SELECT * FROM topics`);
    return rows;
  }

  static async getTopicById(topicId) {
    const [rows] = await db.query(`SELECT * FROM topics WHERE topicId = ?`, [topicId]);
    return rows;
  }

  static async getContentByTopicId(topicId) {
    const [rows] = await db.query(`SELECT * FROM content WHERE topicId = ?`, [topicId]);
    return rows[0];
  }

  static async getAssessmentByTopicId(topicId) {
    const [rows] = await db.query(`SELECT * FROM assessments WHERE topicId = ?`, [topicId]);
    return rows[0];
  }

  static async getQuestionsByTopicId(assessmentId) {
    const [rows] = await db.query(`SELECT * FROM questions WHERE assessmentId = ?`, [assessmentId]);
    return rows;
  }

  static async getDocURL(id) {
    const [rows] = await db.query(`SELECT docURL FROM content WHERE contentId = ?`, [id]);
    return rows[0];
  }
}

module.exports = topics;