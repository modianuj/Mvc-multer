const express = require('express');
const app = express();
const host = 'localhost';
const port = 4400;

// configuration for databse
const db = require('./config/mongoose');

const session = require('express-session')
// config for passport
const passport = require('passport');
const passportJwt = require('./config/passport_Jwt');

// configuration for the url encoded
app.use(express.urlencoded());

// configuration for the uploads(image)
app.use('/uploads', express.static('./uploads'));

// configuration for ejs file
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
  name : 'anuj',
  secret : 'database',
  saveUninitialized : false,
  resave : false,
  cookie : {
    maxAge : 1000 * 60 * 100
  }
}))
app.use(passport.initialize());
app.use(passport.session());

// configuration for express route
app.use('/', require('./routes/index'));

app.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});
