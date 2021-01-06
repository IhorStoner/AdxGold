const { Router } = require('express');
const ImgRouter = Router();
const ImageModel = require('../models/ImageModel');
const multer = require('multer')
const path = require('path')
const watermark = require('jimp-watermark');
const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles')
const fs = require('fs')
const upload = multer({
     dest: UPLOAD_PATH,
     limits: {fileSize: 100000000, files: 5}
})

// upload image
ImgRouter.post('/', upload.array('image', 5),async (req, res, next) => {
  const images = req.files.map((file) => {
    // const waterImg = watermark.addWatermark(file.path,`${__dirname}/../assets/logo.png`).then(img => testImg.push(img))

    return {
      filename: file.filename,
      originalname: file.originalname
    }
  })
  ImageModel.insertMany(images, (err, result) => {
    if (err) return res.sendStatus(404)
    res.json(result)
  })
})

// get image with id
ImgRouter.get('/:id', (req, res, next) => {
      ImageModel.findOne({_id: req.params.id}, (err, image) => {
       if (err) return res.sendStatus(404)
       fs.createReadStream(path.resolve(UPLOAD_PATH, image.filename)).pipe(res)
     })
})

module.exports = ImgRouter