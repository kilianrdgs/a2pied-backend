import {MAIL_TRIGGER_GAUGE_THRESHOLD} from "../../game/gameState.js";

export function getMailTriggerThresholdService() {
    return {threshold: MAIL_TRIGGER_GAUGE_THRESHOLD}
}