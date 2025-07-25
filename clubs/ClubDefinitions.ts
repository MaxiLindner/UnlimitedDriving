export interface ClubDefinition {
    id: number;
    name: string;
    cost: number;
    costType: 'money' | number;
    clubCost?: number;
    produces: 'money' | number;
    revenue?: number;
    productionTime?: number;
}

export const ClubDefinitions: Record<number, ClubDefinition> = {
    1: {
        id: 1,
        name: 'Putter',
        cost: 10,
        costType: 'money',
        produces: 'money',
        revenue: 1
    },
    2: {
        id: 2,
        name: 'Lob Wedge',
        cost: 1000,
        costType: 'money',
        clubCost: 10,
        produces: 1,
        productionTime: 5000
    },
    3: {
        id: 3,
        name: 'Sand Wedge',
        cost: 10000,
        costType: 'money',
        clubCost: 25,
        produces: 2,
        productionTime: 5000
    },
    4: {
        id: 4,
        name: 'Pitching Wedge',
        cost: 100000,
        costType: 'money',
        clubCost: 50,
        produces: 3,
        productionTime: 5000
    },
    5: {
        id: 5,
        name: '9-Iron',
        cost: 1000000,
        costType: 'money',
        clubCost: 100,
        produces: 4,
        productionTime: 5000
    },
    6: {
        id: 6,
        name: '8-Iron',
        cost: 10000000,
        costType: 'money',
        clubCost: 200,
        produces: 5,
        productionTime: 5000
    },
    7: {
        id: 7,
        name: '7-Iron',
        cost: 100000000,
        costType: 'money',
        clubCost: 400,
        produces: 6,
        productionTime: 5000
    },
    8: {
        id: 8,
        name: '6-Iron',
        cost: 1000000000,
        costType: 'money',
        clubCost: 800,
        produces: 7,
        productionTime: 5000
    },
    9: {
        id: 9,
        name: '5-Iron',
        cost: 1000000000,
        costType: 'money',
        clubCost: 1600,
        produces: 8,
        productionTime: 5000
    },
    10: {
        id: 10,
        name: '4-Iron',
        cost: 10000000000,
        costType: 'money',
        clubCost: 3200,
        produces: 9,
        productionTime: 5000
    },
    11: {
        id: 11,
        name: '3-Iron',
        cost: 10000000000,
        costType: 'money',
        clubCost: 6400,
        produces: 10,
        productionTime: 5000
    },
    12: {
        id: 12,
        name: 'Hybrid',
        cost: 100000000000,
        costType: 'money',
        clubCost: 12800,
        produces: 11,
        productionTime: 5000
    },
    13: {
        id: 13,
        name: '3-Wood',
        cost: 10000000000000,
        costType: 'money',
        clubCost: 25600,
        produces: 12,
        productionTime: 5000
    },
    14: {
        id: 14,
        name: 'Driver',
        cost: 1000000000000000,
        costType: 'money',
        clubCost: 51200,
        produces: 13,
        productionTime: 5000
    }
};