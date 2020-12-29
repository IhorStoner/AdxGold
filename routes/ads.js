const { Router } = require('express');
require('express-async-errors')
const AdModel = require('../models/AdModel')
const adsRouter = Router();
const multer  = require("multer");

//get all sort by status and date
adsRouter.get('/', async (req,res) => {
  const ads = await AdModel.find({});
  ads.sort((a,b) => {
    let aStatus = getStatus(a.status);
    let bStatus = getStatus(b.status);
    return aStatus - bStatus === 0? new Date(a.date) - new Date(b.date): aStatus - bStatus;;
  });
  
  function getStatus(status) {
   switch (status) { 
      case "gold" : return 0;
      case "silver": return 1; 
      case "common": return 2; 
      default: return 3;
    }
  }

  res.json(ads)
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

// getArrAdverts
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