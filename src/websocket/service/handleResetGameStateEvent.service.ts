import {resetGameState} from "../../game/gameState.js";
import {creditsService} from "../../credits/service/credits.service.js";
import {deleteAllUpgradesService} from "../../upgrade/service/deleteAllUpgrades.service.js";

export async function handleResetGameStateEventService() {
    resetGameState()
    await deleteAllUpgradesService()
    await creditsService.resetAllCredits()
}