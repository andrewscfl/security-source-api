import express, { Application } from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import GlobalRoutes from './routes'

const app: Application = express()
dotenv.config()
const prisma = new PrismaClient()

async function main() {
    //request parsing
    app.use(express.json());
    
    //registered all exported routes
    GlobalRoutes.forEach(route => app.use(route.path, route.handler) )

    app.listen(process.env.HOST_PORT, () => {
        console.log(`Server running on port ${String(process.env.HOST_PORT)}`)
    })
}


main().then(async () => await prisma.$disconnect())








