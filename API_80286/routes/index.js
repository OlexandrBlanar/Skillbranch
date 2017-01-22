
import pcData from '../data';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
let pc = {};

pcData(pcUrl)
  .then((value) => {pc = value});

exports.parametrs = function(req, res){
  let hardware = req.params.hardware;
  let property = req.params.property;
  console.log(pc);
  if (hardware == 'length' || property == 'length') {
    res.status(404).end('Not Found');
  }
  if (typeof pc[hardware] === 'undefined' || typeof pc[hardware][property] === 'undefined') {
    res.status(404).end('Not Found');
  } else {
    res.status(200).json(pc[hardware][property]);
  }
};

exports.nextParametrs = function(req, res){
  let hardware = req.params.hardware;
  let property = req.params.property;
  let propertyNext = req.params.propertyNext;

  if (hardware == 'length' || property == 'length' || propertyNext == 'length') {
    res.status(404).end('Not Found');
  }
  if (typeof pc[hardware][property] === 'undefined') {
    res.status(404).end('Not Found');
  }
  if (typeof pc[hardware][property][propertyNext] === 'undefined') {
    res.status(404).end('Not Found');
  } else {
    res.status(200).json(pc[hardware][property][propertyNext]);
  }
};

exports.hardware = function (req, res) {
  let hardware = req.params.hardware;

  if (typeof pc[hardware] === 'undefined') {
    if (hardware == 'volumes') {
      let volumes = {};

      for (let i = 0; i < pc['hdd'].length; i++) {
        if (volumes[pc['hdd'][i].volume]) {
          volumes[pc['hdd'][i].volume] += pc['hdd'][i].size;
        } else {
          volumes[pc['hdd'][i].volume] = pc['hdd'][i].size;
        }
      }
      for (let key in volumes) {
        volumes[key] +='B';
      }
      res.status(200).json(volumes);
    } else {
      res.status(404).end('Not Found');
    }
  } else {
    res.status(200).json(pc[hardware]);
  }
};

exports.pcConfiguration = function(req, res){
  res.status(200).json(pc);
};
