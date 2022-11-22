import {Router} from 'express'
import { JwtPayload } from 'jsonwebtoken'

declare global{
    namespace Express {
        interface Request {
            user: {
                user_id: number,
                email: string,
                iat: number,
                exp: number
            }
        }
    }
    interface GlobalRouteHandler {
        path: string,
        handler: Router
    }
}
