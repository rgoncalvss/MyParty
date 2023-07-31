const router = require('express').Router();

const servicesRouter = require('./services');
const partiesRouter = require('./parties');
const usersRouter = require('./users');

router.use('/', servicesRouter);
router.use('/', partiesRouter);
router.use('/users', usersRouter);

module.exports = router;
