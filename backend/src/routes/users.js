const router = require('express').Router();

const userController = require('../controllers/userController');

router.route('/register').post((req, res) => userController.register(req, res));
router.route('/login').post((req, res) => userController.login(req, res));

module.exports = router;
