export type GameStateType = { monsterSpawned: number, monsterKill: number }

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

export const monsterKillUpdate = () => setGameState({monsterKill: ++GameState.monsterKill})
export const monsterBoughtUpdate = () => setGameState({monsterSpawned: ++GameState.monsterSpawned})