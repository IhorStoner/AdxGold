const { promisify } = require('util');
const express = require('express');
const { upload } = require('../middlewares/watermark');
const path = require('path')
const FILESTORAGE = path.resolve(__dirname, 'path/to/uploadedFiles');
const ImgRouter = express.Router();
const fs = require('fs')
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'adx', 
  api_key: '489216836779361', 
  api_secret: '4GHw9gNolLC4akm3A0AKPYu6i5w',
});

ImgRouter.get(
  '/',
  async (req, res) => {
    const data = undefined;
    res.render('index', { data });
  }
);

const formUpload = promisify(
  upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'slider' }
  ])
);


ImgRouter.use('/', express.static(FILESTORAGE))

ImgRouter.post(
  '/',
  async (req, res) => {
    try {
      await formUpload(req, res)
      // await cloudinary.uploader.upload(req.file, function(error, result) {console.log(result, error)});
    } catch (err) {
      console.error(err);
      return res.json({ error: 'invalid_file' });
    }

    const data = { ...req.body, ...req.files };
    const filesNames = data.slider.map(file => file.filename)

    if (req.header('accept') === 'application/json') {
      res.json(filesNames);
    } else {
      res.render('index', { filesNames });
    }
  }
);

ImgRouter.delete('/:imgId',async (req,res) => {
  const imgId = req.params.imgId
  fs.unlink(path.resolve(__dirname, `path/to/uploadedFiles/${imgId}`), (err) => {
    if (err) {
      console.error(err)
      return
    }
    //file removed
  })
  res.sendStatus(200)
})

module.exports = ImgRouter;