import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';
import saveDataInDb from './saveDataInDb';
import Promise from 'bluebird';
import Pet from './models/Pet';
import User from './models/User';
import mongoose from 'mongoose';
import http from 'http';
import pcData from '../data';

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/27017');

let data = {};
const dataUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';
pcData(dataUrl)
  .then((value) => {data = value});

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const obj = {
    "users": await User.find(),
    "pets": await Pet.find(),
  };
  return res.send(JSON.stringify(obj));
});

app.get('/users', async (req, res) => {
  if (req.query.havePet) {
    const pets = await Pet.find({type: req.query.havePet});
    let userid = pets.map((pet) => {return pet.userId});
    let arrId = [];
    userid.forEach((id, i, arr) => {
        if (arrId.indexOf(id) == -1) {
        arrId.push(id);
      }});
    const promises = arrId.map((userid) => {
      return User.find({id: userid});
    });
    const users = await Promise.all(promises);
    const usersArr = users.map((user) => {
        return user[0];
    })
    return res.json(usersArr);
  } else {
    const users = await User.find();
    return res.json(users);
  }
});

app.get('/users/:id', async (req, res) => {
  if (isFinite(req.params.id)) {
    const users = await User.find({id: req.params.id});
    return res.json(users);
  } else if (req.params.id == 'populate') {
    const users = await User.find().populate('pets');;
    return res.json(users);
  } else {
    const users = await User.find({username: req.params.id});
    return res.json(users);
  }

});

app.get('/users/:username/pets', async (req, res) => {
  if (isFinite(req.params.username)) {
    const pets = await Pet.find({userId: req.params.username});
    return res.json(pets);
  } else {
    const users = await User.find({username: req.params.username});
    const pets = await Pet.find({userId: users[0].id});
    return res.json(pets);
  }
});

app.get('/pets', async (req, res) => {
  if (req.query.type) {
    const pets = await Pet.find({type: req.query.type});
    return res.json(pets);
  } else if (req.query.age_gt) {
    const pets = await Pet.find({age: {$gt: req.query.age_gt}});
    return res.json(pets);
  } else if (req.query.age_lt) {
    const pets = await Pet.find({age: {$lt: req.query.age_lt}});
    return res.json(pets);
  } else {
    const pets = await Pet.find();
    return res.json(pets);
  }
});

app.get('/pets/:id', async (req, res) => {
  if (req.params.id == 'populate') {
    if (req.query.type && req.query.age_gt) {
      const pets = await Pet.find({type: req.query.type, age: {$gt: req.query.age_gt}}).populate('user');
      return res.json(pets);
    } else if (req.query.type && req.query.age_lt) {
      const pets = await Pet.find({type: req.query.type, age: {$lt: req.query.age_lt}}).populate('user');
      return res.json(pets);
    } else if (req.query.type) {
      const pets = await Pet.find({type: req.query.type}).populate('user');;
      return res.json(pets);
    }
    const pets = await Pet.find().populate('user');
    return res.json(pets);
  } else {
    const pets = await Pet.find({id: req.params.id});
    return res.json(pets);
  }
});

app.get('/pets/:id/populate', async (req, res) => {
  const pets = await Pet.find({id: req.params.id}).populate('user');
  return res.json(pets);
});

app.get('/data', async (req, res) => {
  return res.json(await saveDataInDb(data));
});

app.get('/remove', async (req, res) => {
  await Pet.remove();
  await User.remove();

  return res.json('Removed success');
});

app.listen(3000, function(){
  console.log('Express server listening on port' );
});
