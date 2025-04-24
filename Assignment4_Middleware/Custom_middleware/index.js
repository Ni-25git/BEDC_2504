const express = require('express');
const validateTodo = require('./middleware');

const app = express();
app.use(express.json());

app.post('/', validateTodo, (req, res) => {
  res.status(200).json({
    message: 'data received',
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
