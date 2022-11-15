import express, { Request, Response, Router } from 'express'
import { GlobalRouteHandler } from '../types'
import { PrismaClient, Organization } from '@prisma/client'
import {createAccountWithOrganization} from '../../utils/account'

const prisma = new PrismaClient()
const accountRoutes: Router = express.Router()


accountRoutes.post('/create-account', async (req: Request, res: Response) => {
    try {
        const username: string = req.body.username
        const password: string = req.body.password
        const organization: Organization = req.body.organization
        if (organization) {
            const success = await createAccountWithOrganization(username, password, organization)
            //TODO make success object that returns most up to date json
        }
    } catch (error) {
        return res.status(500).send('error')
    }
})



const PhishingRoutes: GlobalRouteHandler = {
    path: '/api/accounts',
    handler: accountRoutes
}

export default PhishingRoutes

