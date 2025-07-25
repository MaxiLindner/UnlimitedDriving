import {type ClubDefinition, ClubDefinitions} from '../clubs/ClubDefinitions'

interface GameState {
    money: number;
    clubs: Record<number, { owned: number }>;
}

interface GameAction {
    type: 'ADD_MONEY' | 'ADD_CLUBS' | 'BUY_CLUB';
    amount?: number;
    clubId?: number;
}

export const GameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'ADD_MONEY':
            return { ...state, money: state.money + (action.amount || 0) }
        case 'ADD_CLUBS':
            if (!action.clubId || !action.amount) return state
            return {
                ...state,
                clubs: {
                    ...state.clubs,
                    [action.clubId]: { owned: state.clubs[action.clubId].owned + action.amount }
                }
            }
        case 'BUY_CLUB':
            if (!action.clubId) return state
            const club: ClubDefinition = ClubDefinitions[action.clubId]

            // Check if player can afford the club
            const hasEnoughMoney = state.money >= club.cost
            const hasEnoughClubs = !club.clubCost ||
                (club.id > 1 && state.clubs[club.id - 1]?.owned >= club.clubCost)

            if (hasEnoughMoney && hasEnoughClubs) {
                const newState = {
                    ...state,
                    money: state.money - club.cost,
                    clubs: {
                        ...state.clubs,
                        [action.clubId]: {
                            owned: (state.clubs[action.clubId]?.owned || 0) + 1
                        }
                    }
                }

                // Deduct club cost if applicable
                if (club.clubCost && club.id > 1) {
                    newState.clubs[club.id - 1] = {
                        owned: state.clubs[club.id - 1].owned - club.clubCost
                    }
                }

                return newState
            }

            return state
        default:
            return state
    }
}

export type { GameState, GameAction }