const fs = require('fs');
const path = require('path');

const validateTodo = (req, res, next) => {
  const { ID, Name, Rating, Description, Genre, Cast } = req.body;
  let errors = [];

  if (typeof ID !== 'number') errors.push('❌ ID should be a number');
  if (typeof Name !== 'string') errors.push('❌ Name should be a string');
  if (typeof Rating !== 'number') errors.push('❌ Rating should be a number');
  if (typeof Description !== 'string') errors.push('❌ Description should be a string');
  if (typeof Genre !== 'string') errors.push('❌ Genre should be a string');
  if (!Array.isArray(Cast) || !Cast.every(actor => typeof actor === 'string')) {
    errors.push('❌ Cast should be an array of strings');
  }

  // Log to res.txt
  const logPath = path.join(__dirname, '../res.txt');
  fs.writeFileSync(logPath, errors.length > 0 ? errors.join('\n') : '✅ All fields passed validation');

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'bad request. some data is incorrect.',
    });
  }

  next();
};

module.exports = validateTodo;
