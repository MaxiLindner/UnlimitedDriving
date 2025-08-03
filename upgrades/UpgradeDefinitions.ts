export interface UpgradeDefinition {
    id: number;
    name: string;
    description: string;
    cost: number;
    maxLevel: number;
    effect: {
        type: 'production_multiplier' | 'speed_multiplier' | 'money_bonus';
        value: number;
        target?: 'all' | number;
    };
}

export const UpgradeDefinitions: Record<number, UpgradeDefinition> = {
    1: {
        id: 1,
        name: 'Double Money Production',
        description: 'Doubles money production from all clubs',
        cost: 100,
        maxLevel: 10,
        effect: {
            type: 'production_multiplier',
            value: 2,
            target: 'all'
        }
    },
    2: {
        id: 2,
        name: 'Speed Boost',
        description: 'Increases production speed by 25% per level',
        cost: 250,
        maxLevel: 5,
        effect: {
            type: 'speed_multiplier',
            value: 1.25,
            target: 'all'
        }
    },
    3: {
        id: 3,
        name: 'Putter Specialist',
        description: 'Triples Putter revenue',
        cost: 50,
        maxLevel: 3,
        effect: {
            type: 'production_multiplier',
            value: 3,
            target: 1
        }
    },
    4: {
        id: 4,
        name: 'Money Bonus',
        description: 'Adds $10 per second per level',
        cost: 500,
        maxLevel: 20,
        effect: {
            type: 'money_bonus',
            value: 10
        }
    }
};