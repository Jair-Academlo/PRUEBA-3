const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/user.routes');
const { gameRouter } = require('./routes/game.routes');
const { consoleRouter } = require('./routes/console.routes');

const app = express();

app.use(express.json());
app.use(cors());

//endpoints
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/games/', gameRouter);
app.use('/api/v1/consoles', consoleRouter);

module.exports = { app };
