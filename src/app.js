const express = require("express");
const cors = require("cors");
const path = require("path");
const compilerRoutes = require("./routes/compiler.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/compiler", compilerRoutes);

module.exports = app;