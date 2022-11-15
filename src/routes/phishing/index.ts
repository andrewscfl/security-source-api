import express,{Request,Response,Router} from 'express'
import { GlobalRouteHandler } from '../types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const phishingRoutes : Router = express.Router()

type ValidStatus = 'viewed' | 'failed'

phishingRoutes.post('/phishing-exam', async (req : Request, res: Response) => {
    try {
        const email: String = req.body?.email
        const organizationId: String = req.body?.organizationId
        const status : ValidStatus = req.body?.status
    } catch (error) {
        return res.status(500).send('error')
    }
})



const PhishingRoutes: GlobalRouteHandler = {
    path: '/api/phishing',
    handler: phishingRoutes
}

export default PhishingRoutes

