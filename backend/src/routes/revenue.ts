import { Router } from 'express';
import { deleteDailyRevenue, getDailyRevenue, getRevenue, postDailyRevenue, updateDailyRevenue } from '../controllers/revenue';

const router = Router();

router.get('/', getRevenue);
router.get('/:id', getDailyRevenue);
router.delete('/:id', deleteDailyRevenue);
router.post('/', postDailyRevenue);
router.put('/:id', updateDailyRevenue);

export default router;