const mongoose = require('mongoose');
const moment = require('moment')

const { Schema } = mongoose;
const Status = ['gold', 'silver', 'common'];


const AdSchema = new Schema({
  category: {
    type: String,
  },
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
    type: Number,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: Status,
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
    type: Number,
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
  },
  viewsAll: {
    type: Number,
    default: 0,
  },
  viewsToday: {
    type: Number,
    default: 0
  },
  lastViewDate: {
    type: Date,
    default: new Date()
  },
  fields: {
    type: Object
  },
});


// const AdModel = mongoose.model('ads', AdSchema);

module.exports = {
  Reference: {
    Status
  },
  AdModel: mongoose.model('ads', AdSchema)
};