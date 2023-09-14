import { Prisma, PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const initSeeder = async () => {

    let numbers = 50
    let requestLeave: Prisma.RequestLeaveCreateInput

    enum status {
        Pending = "Pending",
        Approved = "Approved",
        Rejected = "Rejected"
    }

    for(let i = 0; i < numbers; i++) {

        requestLeave = {
            user_id: faker.number.int({
                min: 1,
                max: 100
            }),
            reason: faker.lorem.paragraph(),
            started_date: faker.date.soon({
                days: 10,
                refDate: '2020-09-16T00:00:00.000Z'
            }),
            ended_date: faker.date.soon({
                days: 5,
                refDate: '2020-01-26T00:00:00.000Z'
            }),
            url_proof: faker.image.url(),
            status: faker.helpers.enumValue(status),
            created_at: faker.date.recent({
                days: 5,
                refDate: '2020-09-10T00:00:00.000Z'
            }),
            updated_at: faker.date.recent({
                days: 2,
                refDate: '2020-09-15T00:00:00.000Z'
            })
        }

        await prisma.requestLeave.create({
            data: requestLeave
        })

    }

}

export const startRequestSeeder = async () => {
    try {
        console.log('Seeding table request_leaves');
        await initSeeder()
        console.log('Success');
    } catch (error: any) {
        throw new Error(error)
    }
}