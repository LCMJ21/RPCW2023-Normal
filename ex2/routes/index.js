var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:15015/contracts")
  .then(function (response) {
    res.render('pages/contracts', { title: 'List of Contracts', contracts_list: response.data , d: date });
  })
  .catch(function (error) {
    res.render('error', { message: error.message, error: error });
  })
});

/* GET contract by id. */
router.get('/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:15015/contracts/" + req.params.id)
  .then(function (response) {
    res.render('pages/contract', { title: 'Contract ' + response.data._id, contract: response.data, d: date });
  })
  .catch(function (error) {
    res.render('error', { message: error.message, error: error });
  })
});

/* GET institution by nipc. */
router.get('/inst/:nipc', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:15015/contracts/inst/" + req.params.nipc)
  .then(function (response) {
    if (response.data.length == 0) {
      res.render('error', { message: "Institution not found", error: {status: 404}});
    }
    else {
      inst = response.data[0].institution
      res.render('pages/contracts', { title: 'List of Contracts of ' + inst + " : " + req.params.nipc, contracts_list: response.data , d: date, inst: true });
    }
  })
  .catch(function (error) {
    res.render('error', { message: error.message, error: error });
  })
});

module.exports = router;
