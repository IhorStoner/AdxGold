/* eslint-disable class-methods-use-this, no-underscore-dangle */
// @ts-check
const Jimp = require('jimp');
const multer = require('multer');
const { promisify } = require('util');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const getStream = require('get-stream');
const imagemin = require('imagemin');


const FILESTORAGE = `${process.cwd()}/routes/path/to/uploadedFiles`;

const asyncCryptoRandomBytes = promisify(crypto.randomBytes);

/**
 * @class
 * @implements {multer.StorageEngine}
 */
class WatermarkInterceptorStorage {
  /**
   * @param {multer.DiskStorageOptions
   *  & {watermark: {
   *    path: string; margin_percentage?: number; opacity?: number;
   *  }}} opts
   * @memberof WatermarkInterceptorStorage
   */
  constructor(opts) {
    if (opts.destination) {
      this.destination = typeof opts.destination === 'function' ? promisify(opts.destination) : opts.destination;
    }
    if (opts.filename) {
      this.filename = promisify(opts.filename);
    }
    
    if (!opts.watermark || !opts.watermark.path) {
      throw new Error('UNDEF_WATERMARK');
    }
    this.watermark = Jimp.read(opts.watermark.path); // filepath or url
    this.watermark_opts = opts.watermark;
  }

  async getDestination(req, file, cb) {
    /** @type {string} */
    let dirpath;

    if (typeof this.destination === 'string') {
      dirpath = this.destination;
    } else if (typeof this.destination === 'function') {
      dirpath = await this.destination(req, file);
    } else {
      dirpath = os.tmpdir();
    }

    if (dirpath === null || dirpath === undefined || !/\S/.test(dirpath)) {
      throw new Error('DESTINATION_WRONG');
    }

    await fs.promises.mkdir(dirpath, { recursive: true, mode: '0775' });

    if (cb) {
      cb(null, dirpath);
    }

    return dirpath;
  }

  async getFilename(req, file, cb) {
    /** @type {string} */
    let filepath;

    if (typeof this.filename === 'function') {
      filepath = await this.filename(req, file);
    } else {
      filepath = (await asyncCryptoRandomBytes(16)).toString('hex');
    }

    if (cb) {
      cb(null, filepath);
    }

    return filepath;
  }

  /**
   *
   *
   * @param {Express.Request} req
   * @param {Express.Multer.File} file
   * @param {(error?: any, info?: Partial<Express.Multer.File>) => void} cb
   * @returns
   * @memberof WatermarkInterceptorStorage
   */
  async _handleFile(req, file, cb) {
    /** @type {string} */
    let destination;
    /** @type {string} */
    let filename;
    try {
      [destination, filename] = await Promise.all([
        this.getDestination(req, file),
        this.getFilename(req, file)
      ]);
    } catch (err) {
      return cb(err);
    }

    const finalPath = path.join(destination, filename);


    const buf = await getStream.buffer(file.stream);

    const [image, watermark] = await Promise.all([
      Jimp.read(buf).then(file => {
        return file
          .resize(1400, 760) // resize
          .quality(100)
      }),
      this.watermark
    ]);

    await watermark.resize(image.bitmap.width / 10, Jimp.AUTO);

    const LOGO_MARGIN_PERCENTAGE = this.watermark_opts.margin_percentage || 2;
    const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
    const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

    const X = image.bitmap.width - watermark.bitmap.width - xMargin;
    const Y = image.bitmap.height - watermark.bitmap.height - yMargin;

    await image.composite(
      watermark,
      X, Y,
      {
        mode: Jimp.BLEND_SCREEN,
        opacitySource: this.watermark_opts.opacity || 1,
        opacityDest: 1
      }
    );

    await image.writeAsync(finalPath);

    cb(null, {
      destination,
      filename,
      path: finalPath,
      size: (await image.getBufferAsync(file.mimetype)).length
    });
  }

  _removeFile(req, file, cb) {
    fs.unlink(file.path, cb);
  }
}


const storage = new WatermarkInterceptorStorage({
  destination: async (req, file, cb) => {
    const dirname = `${FILESTORAGE}`;
    cb(null, dirname);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname || `${file.fieldname}.${file.mimetype.split('/')[1]}`;
    const parsed = path.parse(filename);
    cb(null, `${parsed.name}${parsed.ext.toLocaleLowerCase()}`);
  },
  watermark: {
    path: `${process.cwd()}/logo-ru.png`,
    margin_percentage: 3,
  }
});


const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024
  }
});

module.exports = {
  upload
};