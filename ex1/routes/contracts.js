var express = require('express');
var router = express.Router();
var contractsController = require('../controllers/contracts');

/* GET /contracts: devolve uma lista com todos os contratos;. */
router.get('/', function(req, res, next) {
  if (req.query.year) {
    contractsController.getContractsByYear(req.query.year)
      .then(data => res.jsonp(data))
      .catch(err => res.status(500).jsonp(err));
  }
  else if (req.query.inst) {
    contractsController.getContractsByInstitution(req.query.inst)
      .then(data => res.jsonp(data))
      .catch(err => res.status(500).jsonp(err));
  }
  else {
    contractsController.list()
      .then(data => res.jsonp(data))
      .catch(err => res.status(500).jsonp(err));
  }
});

/* GET /contracts/courses: devolve a lista dos cursos dos contratados (sem repetições); */
router.get('/courses', function(req, res, next) {
  contractsController.getCourses()
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err));
});

/* GET /contracts/institutions: devolve a lista das instituições contratantes (sem repetições); */
router.get('/institutions', function(req, res, next) {
  contractsController.getInstitutions()
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err));
});

/* GET /contracts/inst/:nipc: devolve a lista dos contratos de uma instituição, identificada pelo seu nipc; */
router.get('/inst/:nipc', function(req, res, next) {
  contractsController.getContractsByNipc(req.params.nipc)
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err));
});

/* GET /contracts/:id: devolve o contrato com identificador id */
router.get('/:id', function(req, res, next) {
  contractsController.getContract(req.params.id)
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err));
});

/* POST /contracts: acrescenta um contrato novo à BD; */
router.post('/', function(req, res, next) {
  contractsController.add(req.body)
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err));
});

/* DELETE /contracts/:id: elimina da BD o contrato com o identificador id. */
router.delete('/:id', function(req, res, next) {
  contractsController.delete(req.params.id)
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err));
});

module.exports = router;
