// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const schoolsRouter = require('./school.js');
const eventsRouter = require('./events.js');
const serverRouter = require('./server.js');

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/schools', schoolsRouter);

router.use('/events', eventsRouter);

router.use('/server', serverRouter);

module.exports = router;