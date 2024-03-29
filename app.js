const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('connected to database' + config.database)
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err)
});

const app = express();
const users = require('./routes/users');

const port = 3001;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/users', users);

app.use(passport.initialize());
app.use(passport.session())

require('./config/passport')(passport);

app.get('/', (req, res) => {
  res.send('Invalid endpoint, см. README в Гитхаб');
});

app.listen(port, () => {
  console.log('Server started at port '+ port);
  console.log(process.pid);
});
