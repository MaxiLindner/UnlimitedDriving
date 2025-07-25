export interface ClubDefinition {
    id: number;
    name: string;
    cost: number;
    costType: 'money' | number;
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
        cost: 10,
        costType: 1,
        produces: 1,
        productionTime: 1000
    },
    3: {
        id: 3,
        name: 'Sand Wedge',
        cost: 25,
        costType: 2,
        produces: 2,
        productionTime: 15000
    },
    4: {
        id: 4,
        name: 'Pitching Wedge',
        cost: 50,
        costType: 3,
        produces: 3,
        productionTime: 20000
    },
    5: {
        id: 5,
        name: '9-Iron',
        cost: 100,
        costType: 4,
        produces: 4,
        productionTime: 25000
    },
    6: {
        id: 6,
        name: '8-Iron',
        cost: 200,
        costType: 5,
        produces: 5,
        productionTime: 30000
    },
    7: {
        id: 7,
        name: '7-Iron',
        cost: 400,
        costType: 6,
        produces: 6,
        productionTime: 35000
    },
    8: {
        id: 8,
        name: '6-Iron',
        cost: 800,
        costType: 7,
        produces: 7,
        productionTime: 40000
    },
    9: {
        id: 9,
        name: '5-Iron',
        cost: 1600,
        costType: 8,
        produces: 8,
        productionTime: 45000
    },
    10: {
        id: 10,
        name: '4-Iron',
        cost: 3200,
        costType: 9,
        produces: 9,
        productionTime: 50000
    },
    11: {
        id: 11,
        name: '3-Iron',
        cost: 6400,
        costType: 10,
        produces: 10,
        productionTime: 55000
    },
    12: {
        id: 12,
        name: 'Hybrid',
        cost: 12800,
        costType: 11,
        produces: 11,
        productionTime: 60000
    },
    13: {
        id: 13,
        name: '3-Wood',
        cost: 25600,
        costType: 12,
        produces: 12,
        productionTime: 65000
    },
    14: {
        id: 14,
        name: 'Driver',
        cost: 51200,
        costType: 13,
        produces: 13,
        productionTime: 70000
    }
};
