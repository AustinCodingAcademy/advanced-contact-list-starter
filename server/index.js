/* eslint-disable max-len */
/* eslint-disable no-console */
import express from 'express';

const app = express();

app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const contacts = [
  {
    _id: 1,
    name: 'Dale Cooper',
    occupation: 'FBI Agent',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg'
  },
  {
    _id: 2,
    name: 'Spike Spiegel',
    occupation: 'Bounty Hunter',
    avatar: 'http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337'
  }
];

app.get('./contacts', (request, response) => {
  return response.json(contacts);
});

app.all('/*', (request, response) => {
  return response.send(request.params['0']);
});

const PORT = 3001;

app.listen(PORT, (error) => {
  if (error) {
    return console.log('Error!!', error);
  }
  return console.log('Listening on: http://localhost:' + PORT);
});
