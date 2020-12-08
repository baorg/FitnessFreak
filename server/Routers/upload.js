const express = require("express");
const router = express.Router();
const FileUploadHandler = require('../Handlers').FileUploadHandler;
const formData = require('express-form-data')
const { isAuthenticated } = require("../Middlewares");

router.use(formData.parse())

router.post("/image-upload", isAuthenticated, FileUploadHandler.UploadFileHandler);

module.exports = router;