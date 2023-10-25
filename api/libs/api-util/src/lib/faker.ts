import { faker as Faker } from '@faker-js/faker'

export const faker = {
    ...Faker,
    domain: {
        price: (
            options?:
                | number
                | {
                      min?: number
                      max?: number
                  },
        ) =>
            Faker.number.int(
                options || {
                    min: 1000,
                    max: 100000,
                },
            ),
        currency: () => Faker.helpers.arrayElement(['PLN', 'USD', 'EUR']),
        image: (): string => faker.domain.images(1)[0],
        images: (count?: number): string[] =>
            Faker.helpers.arrayElements(['aaaaaa', 'bbbbbb', 'cccccc', 'dddddd', 'eeeeee', 'ffffff'], count),
    },
    enum: {
        value: <T>(enumObj: Record<string, T>): Exclude<T, string> => {
            const values = Object.values(enumObj)
            return Faker.helpers.arrayElement(values) as any
        },
        values: <T>(enumObj: Record<string, T>, count?: number): Exclude<T, string>[] => {
            const values = Object.values(enumObj)
            return Faker.helpers.arrayElements(values, count) as any
        },
    },
    createMany: async <T>(min: number, max: number, mapper: (index: number) => Promise<T>) => {
        const result: T[] = []
        const count = faker.number.int({ min, max })
        for (let i = 0; i < count; i++) {
            result.push(await mapper(i))
        }
        return result
    },
    jsonify: <T, R>(input: T): R => JSON.parse(JSON.stringify(input)),
}
