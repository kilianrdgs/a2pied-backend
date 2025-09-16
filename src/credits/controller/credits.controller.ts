import { Request, Response } from 'express';
import { creditsService } from '../service/credits.service.js';

export class CreditsController {
  /**
   * @openapi
   * /api/credits/save:
   *   post:
   *     tags: [Credits]
   *     summary: Sauvegarder les crédits utilisateur
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userEmail:
   *                 type: string
   *                 example: "mariem.zaiane@edu.esiee-it.fr"
   *               credits:
   *                 type: number
   *                 example: 40
   *               timestamp:
   *                 type: string
   *                 example: "2025-09-15T12:44:54.688Z"
   *     responses:
   *       200:
   *         description: Crédits sauvegardés avec succès
   *       400:
   *         description: Valeur de crédits invalide
   *       401:
   *         description: Utilisateur non authentifié
   */
  async saveCredits(req: Request, res: Response) {
    console.log('Received auth header:', req.headers.authorization);
    try {
      const { credits, timestamp } = req.body;
      
      const userEmail = req.body.userEmail;
      
      if (!userEmail) {
        return res.status(401).json({
          error: 'User not authenticated - missing token'
        });
      }
      
      if (typeof credits !== 'number' || credits < 0) {
        return res.status(400).json({
          error: 'Invalid credits value'
        });
      }

      await creditsService.saveUserCredits(userEmail, credits);
      
      console.log(`Saving ${credits} credits for user ${userEmail} at ${timestamp}`);
      
      res.json({
        message: 'Credits saved successfully to database'
      });
      
    } catch (error) {
      console.error('Error saving credits:', error);
      res.status(500).json({
        error: 'Failed to save credits to database'
      });
    }
  }

  /**
   * @openapi
   * /api/credits/get:
   *   post:
   *     tags: [Credits]
   *     summary: Récupérer les crédits utilisateur
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userEmail:
   *                 type: string
   *                 example: "mariem.zaiane@edu.esiee-it.fr"
   *     responses:
   *       200:
   *         description: Crédits récupérés avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 credits:
   *                   type: number
   *                   example: 30
   *       401:
   *         description: Utilisateur non authentifié
   */
  async getCredits(req: Request, res: Response) {
    try {
      const userEmail = req.body.userEmail  
      
      if (!userEmail) {
        return res.status(401).json({
          error: 'User not authenticated - missing token'
        });
      }
      
      const credits = await creditsService.getUserCredits(userEmail);
      
      res.json({
        credits
      });
      
    } catch (error) {
      console.error('Error fetching credits:', error);
      res.status(500).json({
        error: 'Failed to fetch credits from database'
      });
    }
  }
}