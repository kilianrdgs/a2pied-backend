import { Router } from 'express';
import { CreditsController } from './controller/credits.controller.js';

const router = Router();
const creditsController = new CreditsController();

router.post('/save', creditsController.saveCredits.bind(creditsController));

router.post('/get', creditsController.getCredits.bind(creditsController));
export default router;