import jwt, { Secret } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { ExtendedRequest } from '../routes/types'


export function authenticate(request: ExtendedRequest, response: Response, next: NextFunction): Response | void {
    try {
        const tokenHeader = request.headers['authorization']
        if (!tokenHeader) return response.status(403).json({ success: false, data: 'no token' })
        const token = tokenHeader.replace('Bearer ','')
        const key: Secret = <Secret>process.env.TOKEN_KEY
        const user = jwt.verify(token,key)
        request.user = user
    } catch (error) {
        return response.status(401).send({ success: false, data: 'invalid token' })
    }
    return next()
}
