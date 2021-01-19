const { Router } = require('express');
require('express-async-errors')
const userValidator = require('../middlewares/userValidator');
const UserModel = require('../models/UserModel')
const AdModel = require('../models/AdModel')
const usersRouter = Router();

//get all
usersRouter.get('/', async (req,res) => {
  const users = await UserModel.find({});
  res.json(users)
})

// add new User
usersRouter.post('/', userValidator, async(req,res) => {
  const newUser = new UserModel(req.body);
  const { _id } = await newUser.save();
  res.status(201).send(newUser);
})


// getUserById
usersRouter.get('/:userId', async (req,res) => {
  const selectedUser = await UserModel.findById(req.params.userId);

  if(!selectedUser) {
    res.status(400).send({ error: 'User not found' });
    return
  } else {
    res.status(200).send(selectedUser);
  }
})

//changeUserById
usersRouter.put('/:userId',userValidator, async (req,res) => {
  const updateUser = await UserModel.findByIdAndUpdate(req.params.userId, req.body)
  res.status(200).send(updateUser)
})

//new AD
usersRouter.put('/newOffer/:userId', async(req,res) => {
  const updateUser = await UserModel.findByIdAndUpdate(req.params.userId,{$set: {ads: req.body}})
  res.status(200).send(updateUser)
})

//add favorites ad
usersRouter.put('/favoritesAd/:userId', async(req,res) => {
  const updateUser = await UserModel.findById(req.params.userId)
  let result;
  let ads;

  if(updateUser.favorites.includes(req.body[0])) {
    ads = updateUser.favorites.filter(ad => ad !== req.body[0])
    let favoriteArr = await AdModel.find({'_id': {$in: ads}})
    result = await UserModel.findByIdAndUpdate(req.params.userId,{$set: {favorites: ads, favoritesArr: favoriteArr}})
  } else {
    ads = [...updateUser.favorites, req.body[0]]
    let favoriteArr =  await AdModel.find({'_id': {$in: ads}})
    result = await UserModel.findByIdAndUpdate(req.params.userId,{$set: {favorites: ads, favoritesArr: favoriteArr}})
  }
  
  res.status(200).send(result)
})
//delete ad in account
usersRouter.put('/deleteAd/:userId/:adId', async (req,res) => {
  const userId = req.params.userId
  const adId = req.params.adId
  const selectedUser = await UserModel.findById(userId)
  const newAdsArr = selectedUser.ads.filter(ad => ad !== adId)
  const result = await UserModel.findByIdAndUpdate(userId,{$set: {ads: newAdsArr}})
  res.status(200).send(result)
})

//deleteUserById
usersRouter.delete('/:userId', async (req,res) => {
  const deletedUser = await UserModel.findByIdAndDelete(req.params.userId)
  res.status(200).send(deletedUser)
})


module.exports = usersRouter;