import { UserModel } from "../../users/entities/user.model.js"; 

export class CreditsService {

  async saveUserCredits(userEmail: string, credits: number): Promise<void> {
    try {
      const result = await UserModel.findOneAndUpdate(
        { mail: userEmail }, 
        { credits: credits }, 
        { 
          new: true,          
          upsert: false        
        }
      );

      // Check if the user was found and updated
      if (!result) {
        throw new Error(`User with email ${userEmail} not found`);
      }

      console.log(`Successfully saved ${credits} credits for user ${userEmail}`);
    } catch (error) {
      console.error('Error saving credits to database:', error);
      throw error; 
    }
  }

  // retrieve the user current credits from the db
  async getUserCredits(userEmail: string): Promise<number> {
    try {
      const user = await UserModel.findOne({ mail: userEmail });
      
      
      if (!user) {
        throw new Error(`User with email ${userEmail} not found`);
      }

      return user.credits || 0; 
    } catch (error) {
      console.error('Error fetching credits from database:', error);
      throw error;
    }
  }

  // add credits to current credits
  async addCreditsToUser(userEmail: string, creditsToAdd: number): Promise<number> {
    try {
      const result = await UserModel.findOneAndUpdate(
        { mail: userEmail },
        { $inc: { credits: creditsToAdd } }, 
        { 
          new: true,    
          upsert: false 
        }
      );

      if (!result) {
        throw new Error(`User with email ${userEmail} not found`);
      }

      console.log(`Added ${creditsToAdd} credits to user ${userEmail}. New total: ${result.credits}`);
      return result.credits || 0; 
    } catch (error) {
      console.error('Error adding credits to database:', error);
      throw error;
    }
  }
}

export const creditsService = new CreditsService();