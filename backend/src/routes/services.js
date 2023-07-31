const router = require('express').Router();
const validateToken = require('../middleware/validateToken');
const serviceController = require('../controllers/serviceController');

router.route('/services').post((req, res) => serviceController.create(req, res));
router.route('/services').get(validateToken, (req, res) => serviceController.getAll(req, res));
router.route('/services/:id').get((req, res) => serviceController.getById(req, res));
router.route('/services/:id').delete((req, res) => serviceController.delete(req, res));
router.route('/services/:id').put((req, res) => serviceController.update(req, res));

module.exports = router;
