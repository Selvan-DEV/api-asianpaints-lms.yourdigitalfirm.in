const topicsModel = require('../models/topicsModel');
const axios = require('axios');

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


exports.docProxy = async (req, res) => {
  try {

    const { id } = req.params;



    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const URL = await topicsModel.getDocURL(id);
    console.log(URL, 'URL');

    if (!URL) {
      res.status(400).json({ message: "URL Not Found" });
    }

    const response = await axios({
      url: URL.docURL,
      method: 'GET',
      responseType: 'arraybuffer',
      headers: { 'Origin': '*' },
    });

    console.log(response, 'response');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(response.data);

  } catch (error) {
    console.error('Error fetching PDF:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to fetch PDF' });
  }
};