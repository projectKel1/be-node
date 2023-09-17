import { Prisma, PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const initSeeder = async () => {

    let numbers = 50
    let attendances: Prisma.AttendanceCreateInput

    for(let i = 0; i < numbers; i++) {

        attendances = {
            user_id: faker.number.int({
                min: 1,
                max: 100
            }),
            is_checkout: faker.datatype.boolean({
                probability: 0.8
            }),
            created_at: faker.date.recent({
                days: 5,
                refDate: '2020-09-10T00:00:00.000Z'
            }),
            updated_at: faker.date.recent({
                days: 2,
                refDate: '2020-09-15T00:00:00.000Z'
            })
        }

        await prisma.attendance.create({
            data: attendances
        })

    }

}

export const startAttendances = async () => {
    try {
        console.log('Seeding table attendances');
        await initSeeder()
        console.log('Success');
    } catch (error: any) {
        throw new Error(error)
    }
}