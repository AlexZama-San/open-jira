interface SeedData {
    entries: SeedEntry[];
}


interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}



export const seedData: SeedData = {
    entries: [
        {
            description: 'test pending',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'test2 in progress',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'test3 completed',
            status: 'completed',
            createdAt: Date.now() - 100000,
        }
    ]
}

