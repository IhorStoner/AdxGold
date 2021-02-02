const { Router } = require('express');
require('express-async-errors')
const { AdModel, Reference } = require('../models/AdModel')
const adsRouter = Router();
const _ = require('lodash')

//get all sort by status and date
adsRouter.get('/', async (req, res) => {
  const city = req.query.city;
  const price = req.query.price;
  const date = req.query.date;
  const category = req.query.category
  const sectionParams = req.query.section
  const subsectionParams = req.query.subsection
  const page = req.query.page;
  const pagesize = 25;

  const reqQuery = {
    city: city,
    category: category,
    section: sectionParams,
    subsection: subsectionParams,
    price: price,
    date: 'high',
  };

  const query = [
    {
      $match: { category: { $eq: reqQuery.category } },
    },
    {
      $addFields: {
        __order: { $indexOfArray: [Reference.Status, '$status'] }
      }
    },
    {
      $sort: {
        __order: 1,
        ...(reqQuery.price ? { productPrice: reqQuery.price === 'high' ? -1 : 1 } : {}),
        ...(reqQuery.date ? { backendDate: reqQuery.date === 'high' ? -1 : 1 } : {}),
        updatedAt: -1
      }
    },
  ];
  if (reqQuery.city) {
    query[0].$match.city = { $eq: reqQuery.city };
  }
  if (reqQuery.section) {
    query[0].$match.section = { $eq: reqQuery.section };
  }
  if (reqQuery.subsection) {
    query[0].$match.subsection = { $eq: reqQuery.subsection };
  }

  const items = await AdModel.aggregate([...query, { $skip: ((page || 1) - 1) * pagesize },{ $limit: pagesize }])
  const countAds = await AdModel.aggregate([...query,{$count:'ads'}])

  const pages = Math.ceil((Number(countAds[0].ads)/Number(pagesize)))

  res.json([items, pages])
})

// get shares adverts
adsRouter.get('/sharesAdverts', async (req, res) => {
  const query = [
    {
      $match: { services: { $eq: 'shares' } },
    },
    { $sample: {size: 4} }, 
  ];
  const items = await AdModel.aggregate(query);
  res.json(items)
})

// get sales adverts
adsRouter.get('/salesAdverts', async (req, res) => {
  const query = [
    {
      $match: { services: { $eq: 'sales' } },
    },
    { $sample: {size: 4} }, 
  ];
  const items = await AdModel.aggregate(query);

  res.json(items)
})

adsRouter.get('/recommendedAdverts', async (req, res) => {
  const query = [
    {
      $match: { services: { $eq: 'recommend' } },
    },
    { $sample: {size: 4} }, 
  ];
  const items = await AdModel.aggregate(query);

  res.json(items)
})

adsRouter.get('/hotsAdverts', async (req, res) => {
  const query = [
    {
      $match: { services: { $eq: 'hots' } },
    },
    { $sample: {size: 4} }, 
  ];
  const items = await AdModel.aggregate(query);
  res.json(items)
})

adsRouter.get('/runAdverts', async (req, res) => {
  const ads = await AdModel.findOne({ services: 'runStroke' })
  const query = [
    {
      $match: { services: { $eq: 'runStroke' } },
    },
    { $sample: {size: 4} }, 
  ];
  const items = await AdModel.aggregate(query);

  res.json(items)
})

// getArrAdverts For user
adsRouter.post('/getAdverts', async (req, res) => {
  const adsIdArr = req.body;

  const result = await Promise.all(
    adsIdArr.map((ad) => AdModel.findById(ad))
  );

  if (!result) {
    res.status(400).send({ error: 'Ads not found' });
    return
  } else {
    res.status(200).send(result);
  }
})

// add new 
adsRouter.post('/', async (req, res) => {
  const newAd = new AdModel(req.body);
  const { _id } = await newAd.save();
  res.status(201).send(newAd);
})

//findbyId
adsRouter.get('/:adId', async (req, res) => {
  const selectedAd = await AdModel.findById(req.params.adId);

  if (!selectedAd) {
    res.status(400).send({ error: 'Ad not found' });
    return
  } else {
    res.status(200).send(selectedAd);
  }
})

//changeById
adsRouter.put('/:adId', async (req, res) => {
  const updateAd = await AdModel.findByIdAndUpdate(req.params.adId, req.body)
  res.status(200).send(updateAd)
})

//deleteById
adsRouter.delete('/:adId', async (req, res) => {
  const deletedAd = await AdModel.findByIdAndDelete(req.params.adId)
  res.status(200).send(deletedAd)
})


module.exports = adsRouter;