const express = require('express'); //common js
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');
require('./models/Survey');
require('./services/passport');

const bodyParser = require('body-parser');
//const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); //any post,put request comes to our application then this is going to take care of body data
//.by default it does not take body data

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);


app.use(passport.initialize());
app.use(passport.session());

//authRoutes(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV=='production')
{
	//express will server up production assets
	//like our main.js ,main.css fetchUser

app.use(express.static('client/build'));

	//express will server up index.html
	//if it does nt recgnize the route

const path = require('path');
app.get('*',(req,res)=>{
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
});


}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
