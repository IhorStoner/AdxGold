const { Router } = require('express');
require('express-async-errors')
const AdModel = require('../models/AdModel')
const adsRouter = Router();
const _ = require('lodash')

//get all sort by status and date
adsRouter.get('/', async (req,res) => {
  const city = req.query.city;
  const price = req.query.price;
  const date = req.query.date;

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

  let goldRev = adsGold.reverse() // реверс для того чтобы показывать новые обьявления сверху
  let silverRev = adsSilver.reverse()
  let commonRev = adsCommon.reverse()
  let sortedArr = [...goldRev,...silverRev, ...commonRev] // выстраиваем в порядке голд сильвер обычные
  
  if(price === 'low') {
    sortedArr.sort((ad1, ad2) => sortedFunc(Number(ad1.productPrice), Number(ad2.productPrice)))
  } else if(price === 'high') {
    sortedArr.sort((ad1, ad2) => sortedFunc(Number(ad1.productPrice), Number(ad2.productPrice)))
    sortedArr.reverse()
  }

  if(date === 'low') {
    sortedArr.sort((ad1, ad2) => sortedFunc(Number(ad1.backendDate), Number(ad2.backendDate)))
  } else if (date === 'high'){
    sortedArr.sort((ad1, ad2) => sortedFunc(Number(ad1.backendDate), Number(ad2.backendDate)))
    sortedArr.reverse()
  }

  const page = req.query.page - 1;
  const result = _.chunk(sortedArr, 25) // сортируем в массивы по 25 элементов и отдаем взависимости от страницы
  res.json([result[page],result.length]) // отдаю результат первым агрументом, вторым кол-во страниц
})

const sortedFunc = (ad1, ad2) => {
  if (ad1 < ad2) {
    return -1;
  }
  if (ad1 > ad2) {
    return 1;
  }
  return 0;
}

// get shares adverts
adsRouter.get('/sharesAdverts', async (req,res) => {
  const ads = await AdModel.find({services: 'shares'})
  const result = _.shuffle(ads).slice(0,4);
  res.json(result)
})

// get sales adverts
adsRouter.get('/salesAdverts', async (req,res) => {
  const ads = await AdModel.find({services: 'sales'})
  const result = _.shuffle(ads).slice(0,4);
  
  res.json(result)
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

//changeById
adsRouter.put('/:adId', async (req,res) => {
  const updateAd = await AdModel.findByIdAndUpdate(req.params.adId, req.body)
  res.status(200).send(updateAd)
})

//deleteById
adsRouter.delete('/:adId', async (req,res) => {
  const deletedAd = await AdModel.findByIdAndDelete(req.params.adId)
  res.status(200).send(deletedAd)
})


module.exports = adsRouter;