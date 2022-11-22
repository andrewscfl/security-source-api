import express, { Request, Response, Router } from 'express'
import { createPhishingEntry, createPhishingTest, getActivePhishingTests } from './helpers'
const protectedPhishingRoutes: Router = express.Router()
const openPhishingRoutes: Router = express.Router()


openPhishingRoutes.post('/phishing-exam', async (req: Request, res: Response) => {
    try {
        const email: string = req.body?.email
        const testId: number = req.body?.testId
        if (!(email && testId)) throw new Error('incorrectly formatted post')
        const success = await createPhishingEntry(email, testId)
        if (!success) throw new Error('Error creating or linking accounts')
        return res.status(200).json({ data: 'OK' })

    } catch (error) {
        return res.status(500).send({ data: error })
    }
})

protectedPhishingRoutes.get('/create-phishing-exam', async (req: Request, res: Response) => {
    try {
        const accountId = req?.user?.user_id
        if (!accountId) throw new Error('No account id attached')
        const createdTest = await createPhishingTest(accountId)
        if (!createdTest) throw new Error('Error while creating new test')
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
        if(!phishingData) throw new Error('Error pulling phishing data')
        return res.status(200).json({ data: phishingData })
    } catch (error) {
        return res.status(500).json({ data: error })
    }
})

protectedPhishingRoutes.get('/', (req, res) => res.send('test'))

const ProtectedPhishingRoutes: GlobalRouteHandler = {
    path: '/api/phishing',
    handler: protectedPhishingRoutes
}

const OpenPhishingRoutes: GlobalRouteHandler = {
    path: '/api/public/phishing',
    handler: openPhishingRoutes
}

export { ProtectedPhishingRoutes, OpenPhishingRoutes }

