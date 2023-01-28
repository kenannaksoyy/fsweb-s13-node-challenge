const express = require('express');
const { logger } = require('./logger');
const projectsRouter = require("./projects/projects-router.js");
const actionsRouter = require("./actions/actions-router.js");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get('/', (req, res) => {
    res.send("Server Deneme");
});

module.exports = server;
