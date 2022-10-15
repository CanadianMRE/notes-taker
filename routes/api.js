const router = require('express').Router();
const api = require('./notes.js');

router.use('/notes', api);

module.exports = router;