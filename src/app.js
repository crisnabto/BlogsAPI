const express = require('express');
const loginController = require('./controllers/login.controller');
const userController = require('./controllers/user.controller');
const userValidation = require('./middlewares/userValidation');

// ...

const app = express();

app.use(express.json());

// ...
app.post('/login', loginController.login);

app.post('/user', 
userValidation.validateNewUserData,
userValidation.validateNewUserEmail,
userController.createNewUser);

app.get('/user',
userValidation.validateToken,
userController.getAllUsers);

// app.post('/user', userController)
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
