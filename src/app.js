const express = require('express');
const loginController = require('./controllers/login.controller');

// ...

const app = express();

app.use(express.json());

// ...
app.post('/login', loginController.login);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
