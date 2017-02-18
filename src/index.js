import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import express from 'express';

// initialize express
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// assign route
app.get('/contacts', (request, response) => {
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

  return response.json(contacts);
});

// set route
app.all('/*', (request, response) => {
  return response.send(request.params['0']);
});

// set port
const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) {
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);

});
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
