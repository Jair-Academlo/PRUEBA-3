const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/user.routes');
const { gameRouter } = require('./routes/game.router');

const app = express();

app.use(express.json());
app.use(cors());

//endpoints
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/games/', gameRouter);

module.exports = { app };
