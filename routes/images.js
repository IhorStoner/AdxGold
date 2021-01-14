const { promisify } = require('util');
const express = require('express');
const { upload } = require('../middlewares/watermark');
const path = require('path')
const FILESTORAGE = path.resolve(__dirname, 'path/to/uploadedFiles');
const ImgRouter = express.Router();
const ImageModel = require('../models/ImageModel');
const fs = require('fs')

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
      await formUpload(req, res);
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

// get image with id
// ImgRouter.get('/:id', (req, res, next) => {
//   const param = req.params.id
//   ImageModel.findOne({_id: param}, (err, image) => {
//    if (err) return res.sendStatus(404)
//    fs.createReadStream(path.resolve(FILESTORAGE, image.filename)).pipe(res)
//  })
// })

module.exports = ImgRouter;









// const { Router } = require('express');
// const ImgRouter = Router();
// const ImageModel = require('../models/ImageModel');
// const multer = require('multer')
// const path = require('path')
// const watermark = require('jimp-watermark');
// const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles')
// const fs = require('fs')
// const upload = multer({
//      dest: UPLOAD_PATH,
//      limits: {fileSize: 100000000, files: 5}
// })


// // upload image
// ImgRouter.post('/', upload.array('image', 5),async (req, res, next) => {
//   const images = req.files.map((file) => {
//     // const waterImg = watermark.addWatermark(file.path,`${__dirname}/../assets/logo.png`).then(img => testImg.push(img))

//     return {
//       filename: file.filename,
//       originalname: file.originalname
//     }
//   })
//   ImageModel.insertMany(images, (err, result) => {
//     if (err) return res.sendStatus(404)
//     res.json(result)
//   })
// })



// module.exports = ImgRouter