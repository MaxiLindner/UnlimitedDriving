import {type ClubDefinition, ClubDefinitions} from '../clubs/ClubDefinitions'
import {UpgradeDefinitions} from "../upgrades/UpgradeDefinitions.ts";

interface GameState {
    money: number;
    incomePerSecond: number;
    clubs: Record<number, { owned: number }>;
    upgrades: Record<number, { level: number }>;
}

interface GameAction {
    type: 'ADD_MONEY' | 'ADD_CLUBS' | 'BUY_CLUB' | 'UPDATE_INCOME' | 'BUY_UPGRADE';
    amount?: number;
    clubId?: number;
    income?: number;
    upgradeId?: number;
}

const calculateIncomePerSecond = (clubs: Record<number, { owned: number }>, upgrades: Record<number, { level: number }>): number => {
    let totalIncome = 0;
    let globalMultiplier = 1;
    let globalBonus = 0;

    // Calculate global multipliers and bonuses from upgrades
    Object.entries(upgrades).forEach(([upgradeId, { level }]) => {
        const upgrade = UpgradeDefinitions[parseInt(upgradeId)];
        if (upgrade && level > 0) {
            if (upgrade.effect.type === 'production_multiplier' && upgrade.effect.target === 'all') {
                globalMultiplier *= Math.pow(upgrade.effect.value, level);
            } else if (upgrade.effect.type === 'money_bonus') {
                globalBonus += upgrade.effect.value * level;
            }
        }
    });

    // Calculate income from each club type
    Object.entries(clubs).forEach(([clubId, { owned }]) => {
        const club = ClubDefinitions[parseInt(clubId)];
        if (club && club.produces === 'money' && club.revenue && owned > 0) {
            let clubMultiplier = globalMultiplier;

            // Apply club-specific multipliers
            Object.entries(upgrades).forEach(([upgradeId, { level }]) => {
                const upgrade = UpgradeDefinitions[parseInt(upgradeId)];
                if (upgrade && level > 0 &&
                    upgrade.effect.type === 'production_multiplier' &&
                    upgrade.effect.target === parseInt(clubId)) {
                    clubMultiplier *= Math.pow(upgrade.effect.value, level);
                }
            });

            totalIncome += club.revenue * owned * clubMultiplier;
        }
    });

    return totalIncome + globalBonus;
};

export const GameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'ADD_MONEY':
            const updatedIncomePerSecond = calculateIncomePerSecond(state.clubs, state.upgrades);
            return {
                ...state,
                incomePerSecond: updatedIncomePerSecond,
                money: state.money + updatedIncomePerSecond
            }

        case 'ADD_CLUBS':
            if (!action.clubId || !action.amount) return state
            const newClubs = {
                ...state.clubs,
                [action.clubId]: {
                    owned: (state.clubs[action.clubId]?.owned || 0) + action.amount
                }
            };
            return {
                ...state,
                clubs: newClubs,
                incomePerSecond: calculateIncomePerSecond(newClubs, state.upgrades)
            }

        case 'BUY_CLUB':
            if (!action.clubId) return state
            const club: ClubDefinition = ClubDefinitions[action.clubId]

            // Check if player can afford the club
            const hasEnoughMoney = state.money >= club.cost
            const hasEnoughClubs = !club.clubCost ||
                (club.id > 1 && (state.clubs[club.id - 1]?.owned || 0) >= club.clubCost)

            if (hasEnoughMoney && hasEnoughClubs) {
                const updatedClubs = {
                    ...state.clubs,
                    [action.clubId]: {
                        owned: (state.clubs[action.clubId]?.owned || 0) + 1
                    }
                };

                // Deduct club cost if applicable
                if (club.clubCost && club.id > 1) {
                    updatedClubs[club.id - 1] = {
                        owned: (state.clubs[club.id - 1]?.owned || 0) - club.clubCost
                    };
                }

                return {
                    ...state,
                    money: state.money - club.cost,
                    clubs: updatedClubs,
                    incomePerSecond: calculateIncomePerSecond(updatedClubs, state.upgrades)
                }
            }

            return state

        case 'BUY_UPGRADE':
            if (!action.upgradeId) return state
            const upgrade = UpgradeDefinitions[action.upgradeId]
            if (!upgrade) return state

            const currentLevel = state.upgrades[action.upgradeId]?.level || 0

            // Check if upgrade is already at max level
            if (currentLevel >= upgrade.maxLevel) return state

            // Calculate upgrade cost (exponential scaling)
            const upgradeCost = upgrade.cost * Math.pow(2, currentLevel)

            // Check if player can afford the upgrade
            if (state.money >= upgradeCost) {
                const updatedUpgrades = {
                    ...state.upgrades,
                    [action.upgradeId]: {
                        level: currentLevel + 1
                    }
                };

                return {
                    ...state,
                    money: state.money - upgradeCost,
                    upgrades: updatedUpgrades,
                    incomePerSecond: calculateIncomePerSecond(state.clubs, updatedUpgrades)
                }
            }

            return state

        case 'UPDATE_INCOME':
            return {
                ...state,
                incomePerSecond: calculateIncomePerSecond(state.clubs, state.upgrades)
            }

        default:
            return state
    }
}

export type { GameState, GameAction }