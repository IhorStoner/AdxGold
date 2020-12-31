const { Router } = require('express');
require('express-async-errors')
const AdModel = require('../models/AdModel')
const adsRouter = Router();
const multer  = require("multer");
const _ = require('lodash')

//get all sort by status and date
adsRouter.get('/', async (req,res) => {
  const city = req.query.city;
  let adsGold = [];
  let adsSilver = [];
  let adsCommon = [];

  if(city) {
     adsGold = await AdModel.find({status:'gold',city: city});
     adsSilver = await AdModel.find({status:'silver',city: city});
     adsCommon = await AdModel.find({status:'common',city: city});
  } else {
     adsGold = await AdModel.find({status:'gold'});
     adsSilver = await AdModel.find({status:'silver'});
     adsCommon = await AdModel.find({status:'common'});
  }

  const goldRev = adsGold.reverse() // реверс для того чтобы показывать новые обьявления сверху
  const silverRev = adsSilver.reverse()
  const commonRev = adsCommon.reverse()
  const sortedArr = [...goldRev,...silverRev, ...commonRev] // выстраиваем в порядке голд сильвер обычные
  
  const page = req.query.page - 1;
  const result = _.chunk(sortedArr, 10) // сортируем в массивы по 10 элементов и отдаем взависимости от страницы
  res.json([result[page],result.length - 1]) // отдаю результат первым агрументом, вторым кол-во страниц
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