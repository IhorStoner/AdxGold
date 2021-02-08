const { Router } = require('express');
var LiqPay = require('liqpay');
const public_key = 'sandbox_i40704831909'
const private_key ='sandbox_I5Vc22b5lsbvzpOpcwITLPEcs4JTkxjiQKysNnX0'

const liqpayRouter = Router();

liqpayRouter.post('/', async (req,res) => {
	var liqpay = new LiqPay(public_key, private_key);
	var sign = liqpay.str_to_sign(`${private_key + req.body.data + private_key}`);
	console.log(req.body.data)
})

module.exports = liqpayRouter;