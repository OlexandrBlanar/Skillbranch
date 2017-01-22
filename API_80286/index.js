import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import routes from './routes';

let app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });
app.get('/', routes.pcConfiguration);
app.get('/:hardware', routes.hardware);
// app.get('/volumes', rout;
app.get('/:hardware/:property', routes.parametrs);
app.get('/:hardware/:property/:propertyNext', routes.nextParametrs);


app.listen(3000, function () {
  console.log('Hello');
});
