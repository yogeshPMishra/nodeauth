require('dotenv').config();
require("./config/database").connect();
const express = require('express');
const auth = require('./middleware/auth');
const homeController = require('./controller/homeController');
const app = express();
app.use(express.json());

app.get('/', homeController.home);

app.post('/register',homeController.register)

app.post('/login',homeController.login)

app.get('/dashboard',auth,homeController.dashboard)

app.get('/userlist',auth, homeController.userlist)

module.exports = app;