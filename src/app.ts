import express, { Application } from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import {GlobalRoutes, ProtectedRoutes} from './routes'
import { authenticate } from './middleware/auth'
import cors from 'cors'

const app: Application = express()
dotenv.config()
const prisma = new PrismaClient()

async function main() {
    //request parsing
    app.use(express.json());

    //enable requests from all origin
    app.use(cors())
    
    //register all non-auth routes
    GlobalRoutes.forEach(route => app.use(route.path, route.handler) )

    //register all authenticated routes
    ProtectedRoutes.forEach(route => app.use(route.path, authenticate, route.handler) )

    app.listen(process.env.HOST_PORT, () => {
        console.log(`Server running on port ${String(process.env.HOST_PORT)}`)
    })
}


main().then(async () => await prisma.$disconnect())








