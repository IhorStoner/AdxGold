const { Router } = require('express');
const adsRouter = require('./ads');
const authRouter = require('./auth');
const imageRouter = require('./images');
const registrationRouter = require('./registration');
const users = require('./users');
const liqpayRouter = require('./liqpay');
const apiRouter = Router();

apiRouter.use('/users', users);
apiRouter.use('/auth', authRouter);
apiRouter.use('/registration', registrationRouter)
apiRouter.use('/offer', adsRouter)
apiRouter.use('/images', imageRouter)
apiRouter.use('/liqpay', liqpayRouter)


module.exports = apiRouter;