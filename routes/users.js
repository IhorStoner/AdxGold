const { Router } = require('express');
require('express-async-errors')
const userValidator = require('../middlewares/userValidator');
const UserModel = require('../models/UserModel')
const usersRouter = Router();

//get all studets
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
usersRouter.put('/newAd/:userId', async(req,res) => {
  const updateUser = await UserModel.findByIdAndUpdate(req.params.userId,{$set: {ads: req.body}})
  res.status(200).send(updateUser)
})

//deleteUserById
usersRouter.delete('/:userId', async (req,res) => {
  const deletedUser = await UserModel.findByIdAndDelete(req.params.userId)
  res.status(200).send(deletedUser)
})


module.exports = usersRouter;