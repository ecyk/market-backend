const dotenv = require("dotenv");
dotenv.config();

require("./db")();

const express = require("express");
const app = express();

const { initResponseHandler } = require("./middlewares/initResponseHandler");
const { responseHandler } = require("./middlewares/responseHandler");
const { errorHandler } = require("./middlewares/errorHandler");
const { apiRouter } = require("./routes/apiRoute");

app.use(express.json());
app.use(initResponseHandler);
app.use('/api', apiRouter);
app.use(responseHandler);
app.use(errorHandler);

module.exports = { app };
