'use strict';

let express = require('express');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

// app.use(express.static(__dirname + '/../client'));
app.use(express.static(`${__dirname}/../client`));

app.get('/sports', (request, response) => {
  // response.json(['Cycling', 'Weightlifting']);
  let sports = mongoUtil.sports();
  sports.find()
    .toArray((err, docs) => {
      // console.log(JSON.stringify(docs));
      let sportNames = docs.map((sport) => sport.name);
      response.json(sportNames);
    });
});

app.listen(8181, () => console.log('Listening on 8181'));
