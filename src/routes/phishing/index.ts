import express, { Request, Response, Router } from 'express'
import {Test} from '@prisma/client'
import moment from 'moment'
import { emailTemplate1 } from './assets/emailtemplate'
import { createPhishingEntry, createPhishingTest, getActivePhishingTests, sendPhishingEmails } from './helpers'
const protectedPhishingRoutes: Router = express.Router()
const openPhishingRoutes: Router = express.Router()


openPhishingRoutes.post('/phishing-exam', async (req: Request, res: Response) => {
    try {
        const email: string = req.body?.email
        const testId: number = req.body?.testId
        const timestamp = moment().toISOString()
        if (!(email && testId)) throw new Error('incorrectly formatted post')
        const success = await createPhishingEntry(email, testId, timestamp)
        if (!success) throw new Error('Error creating or linking accounts')
        return res.status(200).json({ data: 'OK' })

    } catch (error) {
        return res.status(500).send({ data: error })
    }
})

protectedPhishingRoutes.post('/create-phishing-exam', async (req: Request, res: Response) => {
    try {
        const accountId = req?.user?.user_id
        const bccList = req.body?.bccList
        if (!accountId) throw new Error('No account id attached')
        const createdTest = await createPhishingTest(accountId)
        if (!createdTest) throw new Error('Error while creating new test')
        const { id } = <Test>createdTest
        if(id && bccList) await sendPhishingEmails(bccList,id)
        return res.status(200).json({ data: createdTest })

    } catch (error) {
        return res.status(500).json({ data: error })
    }
})

protectedPhishingRoutes.get('/active-phishing-campaigns', async (req: Request, res: Response) => {
    try {
        const accountId = req?.user?.user_id
        if (!accountId) throw new Error('No account id attached')
        const phishingData = await getActivePhishingTests(accountId)
        if (!phishingData) throw new Error('Error pulling phishing data')
        return res.status(200).json({ data: phishingData })
    } catch (error) {
        return res.status(500).json({ data: error })
    }
})


openPhishingRoutes.get('/', (req, res) => res.send(emailTemplate1(1)))

const ProtectedPhishingRoutes: GlobalRouteHandler = {
    path: '/api/phishing',
    handler: protectedPhishingRoutes
}

const OpenPhishingRoutes: GlobalRouteHandler = {
    path: '/api/public/phishing',
    handler: openPhishingRoutes
}

export { ProtectedPhishingRoutes, OpenPhishingRoutes }

