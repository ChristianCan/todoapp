// Modules
const express = require("express");
const router = express.Router();

// Resources
const { TodoResources } = require("../resources");

// All routes
router.use("/todos", TodoResources);

module.exports = router;
