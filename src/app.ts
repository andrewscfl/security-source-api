import express, { Application } from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

const app: Application = express()
dotenv.config()
const prisma = new PrismaClient()

async function main() {
    //request parsing
    app.use(express.json());

    const user = await prisma.account.create({
        data: {
            username: 'test',
            password: 'test'
        }
    })

    console.log(user)

    app.listen(process.env.HOST_PORT, () => {
        console.log(`Server running on port ${String(process.env.HOST_PORT)}`)
    })
}


main().then(async () => await prisma.$disconnect())








