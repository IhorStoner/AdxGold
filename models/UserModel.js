const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = 'secret';
const SALT_FACTOR = 10;

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 60,
  },
  surname: {
    type: String,
    required: true,
    maxlength: 60,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    set: rawPassword => bcrypt.hashSync(rawPassword, SALT_FACTOR)
  },
  ads: {
    type: Array
  },
  favorites: {
    type: Array
  },
  favoritesArr: {
    type: Array
  }
});

UserSchema.methods.auth = function (password) {
  return bcrypt.compare(password, this.password).then(result => {
    if(result) {
      return jwt.sign({ _id: this._id }, secret);
    }
  })
}

UserSchema.statics.verifyToken = function (token) {
  return new Promise((res, rej) => {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) return rej(err);
      return res(decoded);
    });
  })
};
const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;