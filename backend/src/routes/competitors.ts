import { Router } from 'express';
import { getCompetitors, getCompetitor } from './../controllers/competitors';

const competitorRouter = Router();

competitorRouter.get('/competitors', getCompetitors);

competitorRouter.get('/competitors/:id', getCompetitor);

export default competitorRouter;
