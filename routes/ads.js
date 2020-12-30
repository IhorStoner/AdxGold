const { Router } = require('express');
require('express-async-errors')
const AdModel = require('../models/AdModel')
const adsRouter = Router();
const multer  = require("multer");
const _ = require('lodash')

//get all sort by status and date
adsRouter.get('/', async (req,res) => {
  const adsGold = await AdModel.find({status:'gold'});
  const adsSilver = await AdModel.find({status:'silver'});
  const adsCommon = await AdModel.find({status:'common'});
  const goldRev = adsGold.reverse()
  const silverRev = adsSilver.reverse()
  const commonRev = adsCommon.reverse()
  const sortedArr = [...goldRev,...silverRev, ...commonRev]
  const page = req.query.page - 1;
  const result = _.chunk(sortedArr, 10)
  res.json(result[page])
})

adsRouter.get('/countAds', async (req,res) => {
  const result = await AdModel.find({})

  res.json(result.length)
})

// get shares adverts
adsRouter.get('/sharesAdverts', async (req,res) => {
  const ads = await AdModel.find({services: 'shares'})
  res.json(ads)
})

// get sales adverts
adsRouter.get('/salesAdverts', async (req,res) => {
  const ads = await AdModel.find({services: 'sales'})
  res.json(ads)
})

adsRouter.get('/recommendedAdverts', async (req,res) => {
  const ads = await AdModel.find({services: 'recommend'})
  res.json(ads)
})

adsRouter.get('/hotsAdverts', async (req,res) => {
  const ads = await AdModel.find({services: 'hots'})
  res.json(ads)
})

adsRouter.get('/runAdverts', async (req,res) => {
  const ads = await AdModel.find({services: 'runStroke'})
  res.json(ads)
})

// getArrAdverts For user
adsRouter.post('/getAdverts', async (req,res) => {
  const adsIdArr = req.body;
 
  const result = await Promise.all(
    adsIdArr.map((ad) => AdModel.findById(ad))
  );

  if(!result) {
    res.status(400).send({ error: 'Ads not found' });
    return
  } else {
    res.status(200).send(result);
  }
})

// add new 
adsRouter.post('/', async(req,res) => {
  const newAd = new AdModel(req.body);
  const { _id } = await newAd.save();
  res.status(201).send(newAd);
})

//findbyId
adsRouter.get('/:adId', async (req,res) => {
  const selectedAd = await AdModel.findById(req.params.adId);

  if(!selectedAd) {
    res.status(400).send({ error: 'Ad not found' });
    return
  } else {
    res.status(200).send(selectedAd);
  }
})



//changeUserById
adsRouter.put('/:adId', async (req,res) => {
  const updateAd = await AdModel.findByIdAndUpdate(req.params.adId, req.body)
  res.status(200).send(updateAd)
})

//deleteUserById
adsRouter.delete('/:adId', async (req,res) => {
  const deletedUser = await AdModel.findByIdAndDelete(req.params.userId)
  res.status(200).send(deletedUser)
})


module.exports = adsRouter;