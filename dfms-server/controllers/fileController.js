const AWS = require('aws-sdk');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const File = require('../models/fileModel');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploadFile = async (req, res) => {
  const fileContent = fs.readFileSync(req.file.path);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}-${req.file.originalname}`,
    Body: fileContent,
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
    const newFile = new File({
      filename: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
      storage_location: data.Location,
      owner: req.user.id,
    });
    await newFile.save();
    fs.unlinkSync(req.file.path);
    res.status(200).send(data);
  });
};

const downloadFile = async (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.params.filename,
  };
  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
    res.attachment(req.params.filename);
    res.status(200).send(data.Body);
    fs.unlinkSync(req.file.path);
    console.log(data.Body);
  });
};

const listFiles = async (req, res) => {
  const files = await File.find({ owner: req.user.id });
  res.status(200).send(files);
};

const deleteFile = async (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.params.filename,
  };
  s3.deleteObject(params, async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
    await File.deleteOne({ filename: req.params.filename }, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'File deleted successfully' });
    });
  });
};

module.exports = { uploadFile, downloadFile, listFiles, deleteFile };
