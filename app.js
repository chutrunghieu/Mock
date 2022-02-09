const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var methodOverride = require("method-override");

const app = express();
var usersRouter = require('./routes/users');
var systemRouter = require('./routes/system');
var adminRouter = require('./routes/admin');

const db = require('./config/database'); 
//connect database
const testDatabase = async(req, res) => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testDatabase();

app.use(
    methodOverride((req, res) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', usersRouter);
app.use('/system', systemRouter);
app.use('/admin',adminRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT);

module.exports = app;