import express, { Request, Response, Router } from 'express'
import { GlobalRouteHandler } from '../types'
import { PrismaClient, Organization } from '@prisma/client'
import { checkOnlyEmail } from './helpers'

const prisma = new PrismaClient()
const accountRoutes: Router = express.Router()


accountRoutes.post('/register', async (req: Request, res: Response) => {
    try {
        const {email,password,organizationName} : {email: string, password: string, organizationName: string} = req.body
        if(!email || !password || !organizationName) throw "Missing Parameters"
        const emailIsUnique = await checkOnlyEmail(email)
        console.log(emailIsUnique)
        res.status(200).json({data: ''})

       
    } catch (error) {
        return res.status(500).json({
            data: error
        })
    }
})

accountRoutes.get('/',(req,res) => res.send('test'))



const PhishingRoutes: GlobalRouteHandler = {
    path: '/api/accounts',
    handler: accountRoutes
}

export default PhishingRoutes

