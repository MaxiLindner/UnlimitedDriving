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
            if (club.costType === 'money' && state.money >= club.cost) {
                return {
                    ...state,
                    money: state.money - club.cost,
                    clubs: {
                        ...state.clubs,
                        [action.clubId]: { owned: state.clubs[action.clubId].owned + 1 }
                    }
                }
            }
            if (typeof club.costType === 'number' && state.clubs[club.costType].owned >= club.cost) {
                return {
                    ...state,
                    clubs: {
                        ...state.clubs,
                        [club.costType]: { owned: state.clubs[club.costType].owned - club.cost },
                        [action.clubId]: { owned: state.clubs[action.clubId].owned + 1 }
                    }
                }
            }
            return state
        default:
            return state
    }
}

export type { GameState, GameAction }