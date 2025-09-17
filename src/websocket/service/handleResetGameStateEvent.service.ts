import {resetGameState} from "../../game/gameState.js";
import {creditsService} from "../../credits/service/credits.service.js";

export async function handleResetGameStateEventService() {
    resetGameState()
    await creditsService.resetAllCredits()
}