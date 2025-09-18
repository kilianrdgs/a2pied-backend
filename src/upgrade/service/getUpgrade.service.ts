import {UpgradeModel} from "../entities/upgrade.model.js";
import {UserModel} from "../../users/entities/user.model.js";
import {promises as fs} from "fs";
import {getUserByMailService} from "../../users/service/getUsers.service.js";
import {IUpgrade} from "../entities/upgrade.interface.js";
import {UpgradeConfigRule} from "../entities/UpgradeConfigRule.interface.js";

export async function getUserUpgradeService(userEmail: string) {
    const user = await UserModel.findOne({mail: userEmail})
    if (!user) return []
    return UpgradeModel.find({user: user._id});
}

export async function getAvailablesUpgradeForUserService(email: string) {
    const filePath = './src/upgrade/upgradesConfig.json';
    const content: string = await fs.readFile(filePath, 'utf8');
    const upgradesConfig: UpgradeConfigRule = JSON.parse(content);

    const user = await getUserByMailService(email)
    const userUpgrades: Record<string, number> = {};
    for (const u of user.upgrades as IUpgrade[]) {
        userUpgrades[u.name] = u.level;
    }
    // 4. Préparer la liste des upgrades disponibles
    const availableUpgrades = [];

    for (const [name, rules] of Object.entries(upgradesConfig)) {
        const currentLevel = userUpgrades[name] ?? 0;

        const nextLevel = currentLevel + 1;
        const nextCost = calculateUpgradeCost(rules.baseCost, rules.costMultiplier, nextLevel);
        availableUpgrades.push({
            name,
            nextLevel,
            nextCost,
            description: rules.description,
            maxLevel: rules.maxLevel
        });

    }
    return availableUpgrades;
}

// Calcul du coût en fonction du niveau et des règles du JSON
function calculateUpgradeCost(baseCost: number, costMultiplier: number, nextLevel: number): number {
    // Exemple: coût du nouveau niveau (nextLevel, donc +1 par rapport au niveau actuel)
    // baseCost * (costMultiplier)^(nextLevel - 1)
    return Math.round(baseCost * Math.pow(costMultiplier, nextLevel - 1));
}
