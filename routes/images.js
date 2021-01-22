const { promisify } = require('util');
const express = require('express');
const { upload } = require('../middlewares/watermark');
const path = require('path')
const FILESTORAGE = path.resolve(__dirname, 'path/to/uploadedFiles');
const ImgRouter = express.Router();
const fs = require('fs')
const Access_Key_ID = 'AKIAJ7IQ4NLOQSXWP6CA'
const Secret_Access_Key = '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'


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
    } catch (err) {
      console.error(err);
      return res.json({ error: 'invalid_file' });
    }

    const data = { ...req.body, ...req.files };
    const filesNames = data.slider.map(file => file.filename)
    // const imgUrl = []

    // const filesNames = data.slider.map(file => {
    //   return cloudinary.uploader.upload(file.path, function(error, result) {imgUrl.push(result.secure_url)})
    // })
    // const result = await Promise.all(filesNames)
    
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