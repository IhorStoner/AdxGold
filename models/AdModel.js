const mongoose = require('mongoose');
const moment = require('moment')

const { Schema } = mongoose;

const AdSchema = new Schema({
  city: {
    type: String,
  },
  img: {
    type: Array,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  date: {
    type: String,
    default: moment().locale("ru").format('L'),
  },
  backendDate: {
    type: String,
    default: Date.now(),
  },
  status: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  priceAd: {
    type: String,
  },
  productPrice: {
    type: String,
  },
  section: {
    type: String,
  },
  services: {
    type: Array,
  },
  subsection: {
    type: String,
  },
  title: {
    type: String,
  },
  mail: {
    type: String,
  }
});


const AdModel = mongoose.model('ads', AdSchema);

module.exports = AdModel;