export type GameStateType = { monsterSpawned: number, monsterKill: number }

export const MAIL_TRIGGER_GAUGE_THRESHOLD: number = 2 as const

export let GameState: GameStateType = {
    monsterSpawned: 0,
    monsterKill: 0
}

export const getGameState = () => (GameState)
export const setGameState = (newState: Partial<GameStateType>) => {
    GameState = {...GameState, ...newState}
    return GameState
}
export const resetGameState = () => setGameState({monsterKill: 0, monsterSpawned: 0})

export const monsterKillGameStateUpdate = () => setGameState({monsterKill: ++GameState.monsterKill})
export const monsterBoughtUpdate = () => setGameState({monsterSpawned: ++GameState.monsterSpawned})