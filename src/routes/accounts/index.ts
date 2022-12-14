import express, { Request, Response, Router } from 'express'
import { PrismaClient, Organization, Account } from '@prisma/client'
import { checkOnlyEmail, createAccount, findAccount } from './helpers'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const accountRoutes: Router = express.Router()


accountRoutes.post('/register', async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password, organizationName }: { email: string, password: string, organizationName: string } = req.body
        if (!email || !password || !organizationName) throw new Error("Missing Parameters")
        const emailIsUnique = await checkOnlyEmail(email)
        if (!emailIsUnique) throw new Error("Email is not unique")
        const hashedPassword = CryptoJS.SHA256(password + <string>process.env.SALT).toString(CryptoJS.enc.Base64)
        const account = await createAccount(email, hashedPassword, organizationName)
        if (!account) throw new Error('Account Creation Error')
        return res.status(200).json({ success: true })

    } catch (error) {
        return res.status(500).json({
            data: (<Error>error).message
        })
    }
})

accountRoutes.post('/login', async(req: Request, res: Response): Promise<Response> =>{
    try {
        const {email, password} : {email: string, password: string} = req.body
        if(!(email && password)) throw new Error('No Username/Password')
        const account = await findAccount(email)
        const hashedPassword = CryptoJS.SHA256(password + <string>process.env.SALT).toString(CryptoJS.enc.Base64)
        if(account && (<Account>account).password && hashedPassword === (<Account>account).password  ){
            const token = jwt.sign({ user_id: (<Account>account).id, email }, <string>(process.env.TOKEN_KEY), {
                expiresIn: '10h'
            })
            return res.status(200).json({ token })
        }
        else throw new Error('account not found or password incorrect')

    } catch (error) {
        return res.status(500).json({
            data: (<Error>error).message
        })
    }
})

accountRoutes.get('/', (req, res) => res.send('test'))



const PhishingRoutes: GlobalRouteHandler = {
    path: '/api/accounts',
    handler: accountRoutes
}

export default PhishingRoutes

