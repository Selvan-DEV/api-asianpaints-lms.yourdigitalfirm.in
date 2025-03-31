const topicsModel = require('../models/topicsModel');

exports.topics = async (_req, res) => {
  try {
    const topics = await topicsModel.getTopics();

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.topic = async (req, res) => {
  try {

    const { topicId } = req.params;

    if (!topicId) {
      return res.status(400).json({ message: 'Topic ID is required' });
    }

    const topics = await topicsModel.getTopicById(topicId);

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.content = async (req, res) => {
  try {

    const { topicId } = req.params;

    if (!topicId) {
      return res.status(400).json({ message: 'Topic ID is required' });
    }

    const topics = await topicsModel.getContentByTopicId(topicId);

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assessment = async (req, res) => {
  try {

    const { topicId } = req.params;

    if (!topicId) {
      return res.status(400).json({ message: 'Topic ID is required' });
    }

    let response = {
      assessment: {},
      questions: []
    }

    const assessment = await topicsModel.getAssessmentByTopicId(topicId);
    if (assessment) {
      response.assessment = assessment;
      response.questions = await topicsModel.getQuestionsByTopicId(assessment.assessmentId);
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
