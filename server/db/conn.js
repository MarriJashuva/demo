const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('DB connection established');
  }).catch((e) => {
    console.error('Connection error:', e);
  });

