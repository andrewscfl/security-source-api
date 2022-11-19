import {Router, Request} from 'express'

export interface GlobalRouteHandler {
    path: string,
    handler: Router
}

export interface ExtendedRequest extends Request {
    user?: Object
}
