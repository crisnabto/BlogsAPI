const express = require('express');
const loginController = require('./controllers/login.controller');
const userController = require('./controllers/user.controller');
const categoryController = require('./controllers/category.controller');
const postController = require('./controllers/post.controller');
const userValidation = require('./middlewares/userValidation');
const postValidation = require('./middlewares/postValidation');

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

app.get('/user/:id',
userValidation.validateToken,
userController.getUserById);

app.post('/categories',
userValidation.validateToken,
categoryController.createNewCategory);

app.get('/categories',
userValidation.validateToken,
categoryController.showAllCategories);

app.post('/post',
userValidation.validateToken,
postValidation.postValidate,
postValidation.postValidateCategory,
postController.createNewPost);

app.get('/post',
userValidation.validateToken,
postController.showAllPosts);

app.get('/post/:id',
userValidation.validateToken,
postController.getPostById);

app.put('/post/:id',
userValidation.validateToken,
postController.updatePost);

app.delete('/post/:id',
userValidation.validateToken,
postController.deletePost);

// app.post('/user', userController)
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
