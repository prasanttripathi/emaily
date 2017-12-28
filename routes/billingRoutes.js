const keys = require('../config/keys');
const requireLogin =require('../middlewares/requireLogin');
const stripe = require('stripe')(keys.stripeSecretKey);
  //https://stripe.com/docs/api/node#charge_object


module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
//now we are using middlewares (requirelogin)
  /*  if(!req.user)
    {
      return res.status(401).send({error : 'you must log in'});
    } */
    //https://stripe.com/docs/api/node#charge_object


//console.log(req.body);
const charge= await stripe.charges.create({
amount : 500,
currency : 'usd',
description : '5$ for 5 surveys credit',
source : req.body.id
});

req.user.credits+=5;
const user= await req.user.save();

res.send(user);
  });
};
