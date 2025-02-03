import { Router } from 'express';
import { getEvents, getEvent, deleteEvent, postEvent, updateEvent } from './../controllers/calendar';

const calendarRouter = Router();

calendarRouter.get('/events', getEvents);
calendarRouter.get('/events/:id', getEvent);
calendarRouter.delete('/events/:id', deleteEvent);
calendarRouter.post('/events', postEvent);
calendarRouter.put('/events/:id', updateEvent);

export default calendarRouter;