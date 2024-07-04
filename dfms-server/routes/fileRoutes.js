const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const {
  uploadFile,
  downloadFile,
  listFiles,
  deleteFile,
} = require('../controllers/fileController');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', ensureAuthenticated, upload.single('file'), uploadFile);

router.get('/download/:filename', ensureAuthenticated, downloadFile);

router.get('/', ensureAuthenticated, listFiles);
router.delete('/delete/:filename', ensureAuthenticated, deleteFile);

module.exports = router;
