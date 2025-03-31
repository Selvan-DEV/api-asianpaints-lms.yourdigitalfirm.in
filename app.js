const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/userRoutes');
const topicsRoutes = require('./routes/topicsRoute');
const coursesRoutes = require('./routes/coursesRoute');

const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS for all origins (be cautious with this in production)
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/courses', coursesRoutes);

// Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});