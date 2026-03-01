const express = require("express");
const router = express.Router();
const compilerController = require("../controllers/compiler.controller");

router.post("/run", compilerController.runCode);

module.exports = router;