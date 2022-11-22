import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'


export function authenticate(request: Request, response: Response, next: NextFunction): Response | void {
    try {
        const tokenHeader = request.headers['authorization']
        if (!tokenHeader) return response.status(403).json({ success: false, data: 'no token' })
        const token = tokenHeader.replace('Bearer ','')
        const key: Secret = <Secret>process.env.TOKEN_KEY
        const user = jwt.verify(token,key)
        request.user = <Request['user']>user
    } catch (error) {
        return response.status(401).send({ success: false, data: 'invalid token' })
    }
    return next()
}
