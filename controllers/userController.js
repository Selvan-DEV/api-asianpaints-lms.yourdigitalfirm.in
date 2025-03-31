const User = require('../models/userModel');
const topicsModel = require('../models/topicsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.createUser({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET, // Ensure you have a JWT_SECRET environment variable
      // { expiresIn: '1h' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.startTopic = async (req, res) => {
  try {
    const { userId, topicId, courseId } = req.body;
    if (!userId || !topicId || !courseId) {
      return res.status(400).json({ message: 'Topic , Course ID and User ID is required' });
    }
    const response = await User.startTopic({ userId, topicId, courseId });
    if (!response) {
      res.status(500).json({ message: "Faild to start the topic!" });
      return;
    }

    res.status(201).json({ message: "Topic started successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.topicStatusUpdate = async (req, res) => {
  try {
    const { userId, topicId } = req.body;
    if (!userId || !topicId) {
      return res.status(400).json({ message: 'Topic ID and User ID is required' });
    }

    const response = await User.topicStatusUpdate({ userId, topicId });
    if (!response) {
      res.status(500).json({ message: "Faild to update the status of the topic" });
      return;
    }

    res.status(200).json({ message: "Topic status updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.startAssessment = async (req, res) => {
  try {
    const { userId, assessmentId, topicId, courseId } = req.body;
    if (!userId || !assessmentId || !topicId) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const existing = await User.findUserAssessment(userId, assessmentId);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Assessment already started!" });
    }

    const result = await User.startAssessment({ userId, assessmentId, topicId, courseId });
    if (result) {
      res.status(201).json({ message: "Assessment started successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitAssessment = async (req, res) => {
  try {
    const { userId, assessmentId, answers } = req.body;
    if (!assessmentId || !userId) {
      return res.status(400).json({ message: 'Assessment ID and User ID is required' });
    }

    let correctAnswers = 0;

    for (const answer of answers) {
      const { questionId, selectedOption } = answer;
      const correct = await User.getCorrectAnswer(questionId);

      if (!correct) {
        return res.status(400).json({ error: `Invalid questionId: ${questionId}` });
      }

      const isCorrect = correct.answerText === selectedOption;
      if (isCorrect) {
        correctAnswers++;
      };

      // Save user answer
      await User.insertUserAnswers({ userId, assessmentId, questionId, selectedOption, isCorrect });
    }

    // Update user's assessment record
    const updateResult = await User.updateUserAssessment({ correctAnswers, userId, assessmentId });

    if (updateResult.affectedRows === 0) {
      return res.status(400).json({ error: "Invalid userId or assessmentId" });
    }

    res.json({ message: "Assessment submitted!", score: correctAnswers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAssessmentResult = async (req, res) => {
  try {
    const { userId, assessmentId } = req.params;
    if (!userId || !assessmentId) {
      return res.status(400).json({ message: 'User ID AND Assessment ID is required' });
    }

    const result = await User.getAssessmentResult({ userId, assessmentId });

    if (result.length === 0) {
      return res.status(404).json({ error: "Result not found!" });
    }

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
