const express = require('express');
const { Event, School } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// validate event data
const validateEvent = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name for the event.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description for the event.'),
  check('date')
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage('Please provide a valid date for the event.'),
  check('time')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Please provide a valid time for the event.'),
  handleValidationErrors
];

router.get('/:schoolId', async (req, res) => {
  const events = await Event.findAll({
    include: {
      model: School,
      where: { id: req.params.schoolId.slice(-1) }
    }
  });
  if(events) {
    const eventsObj ={};
     events.forEach(event => {
      eventsObj[event.id] = {
        id: event.id,
        name: event.name,
        description: event.description,
        location: event.location,
        date: event.date,
        time: event.time,
        price: event.price,
        imageUrl: event.imageUrl,
        status: event.status,
        schoolId: event.schoolId
      };
    });
    return res.json(eventsObj);
  }
  if (!events) {
    return res.status(404).json({ message: 'No events found' });
  }
}
);

router.get('/:schoolId/:eventId', async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  return res.json(event);
}
);

router.post('/', validateEvent, async (req, res, next) => {
  let { schoolId, name, description, location, date, time, price, imageUrl, status } = req.body;

  status = status || 'upcoming';
  imageUrl = imageUrl || `https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?semt=ais_hybrid&w=740`;

  let event

  try{
    event = await Event.create({
      schoolId,
      name,
      description,
      location,
      date,
      time,
      price,
      imageUrl,
      status
    });
  }
  catch (error) {
    const err = new Error('Event creation failed');
    err.status = 400;
    err.title = "Sequelize validation or constraint error";
    err.message = "Server error. Please try again later.";
    return next(err);
  }

  return res.status(201).json(event);
}
);

router.put('/:eventId', validateEvent, async (req, res) => {
  const { name, description, date, time, price, imageUrl, status } = req.body;

  // Find the event by ID
  const event = await Event.findByPk(req.params.eventId.slice(-1));


  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  await event.update({ name, description, date, time, price, imageUrl, status });
  return res.json(event);
}
);

router.delete('/:eventId', async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  await event.destroy();
  return res.status(204).end(req.params.eventId);
}
);

module.exports = router;