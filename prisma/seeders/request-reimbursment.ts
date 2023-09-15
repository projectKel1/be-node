import { Prisma, PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const initSeeder = async () => {

    let numbers = 50
    let requestReimburses: Prisma.RequestReimbursesCreateInput

    enum status {
        pending = "pending",
        approved_lead = "approved_lead",
        approved_hr = "approved_hr",
        reject = "reject"
    }

    enum type {
        transportation = "transportation",
        dentist = "dentist",
        glassess = "glassess",
        others = "others"
    }

    for(let i = 0; i < numbers; i++) {

        requestReimburses = {
            user_id: faker.number.int({
                min: 1,
                max: 100
            }),
            description: faker.lorem.paragraph(),
            type: faker.helpers.enumValue(type),
            nominal: faker.number.bigInt({
                min: 50000,
                max: 5000000
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

        await prisma.requestReimburses.create({
            data: requestReimburses
        })

    }

}

export const startRequestReimburses = async () => {
    try {
        console.log('Seeding table request_reimburses');
        await initSeeder()
        console.log('Success');
    } catch (error: any) {
        throw new Error(error)
    }
}